using OmDeHoek.Model;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class BuurtService(
    UnitOfWork uow,
    TokenService tokenService
    )
{
    public async Task<BuurtDto> GetByStatistischeSectorCodeAsync(string code, Talen taal = Talen.En)
    {
        if (string.IsNullOrEmpty(code))
        {
            throw new InvalidInputException("Statistische SectorCode cannot be null or empty.", "StatistischeSectorCode");
        }
        var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(code);
        if (buurt == null)
        {
            throw new ResourceNotFoundException($"Buurt with Statistische SectorCode '{code}' not found.", "StatischeSectorCode");
        }
        return new BuurtDto(buurt, taal);
    }

    public async Task<List<BuurtDto>> GetByDeelGemeenteNis6CodeAsync(string nis6Code, Talen taal = Talen.En)
    {
        if (string.IsNullOrEmpty(nis6Code))
        {
            throw new InvalidInputException("NIS6 code cannot be null or empty.", "NIS6Code");
        }

        var buurten = (await uow.BuurtRepository.GetByDeelGemeenteNis6CodeAsync(nis6Code)).ToArray();

        if (buurten == null || buurten.Length == 0)
        {
            throw new ResourceNotFoundException($"No buurten found for NIS6 code '{nis6Code}'.", "NIS6Code");
        }
        return buurten.Select(b => new BuurtDto(b, taal)).ToList();
    }

    public async Task<List<BuurtDto>> GetByGemeenteNisCodeAsync(string nisCode, Talen taal = Talen.En)
    {
        if (string.IsNullOrEmpty(nisCode))
        {
            throw new InvalidInputException("NIS code cannot be null or empty.", "NISCode");
        }

        var buurten = (await uow.BuurtRepository.GetByGemeenteNisCodeAsync(nisCode)).ToArray();

        if (buurten == null || buurten.Length == 0)
        {
            throw new ResourceNotFoundException($"No buurten found for NIS code '{nisCode}'.", "NISCode");
        }
        return buurten.Select(b => new BuurtDto(b, taal)).ToList();
    }

    public async Task JoinBuurtAsync(string buurtId, string token)
    {
        await uow.StartTransaction();
        try
        {
            var userId = tokenService.GetUserIdFromToken(token);
            var user = await uow.UserRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new UnauthorizedException("User not found.", "User");
            }

            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(buurtId);
            if (buurt == null)
            {
                throw new ResourceNotFoundException($"Buurt with Statistische SectorCode '{buurtId}' not found.", "StatischeSectorCode");
            }

            // Check if user is already a member of the buurt
            if (buurt.Bewoners.Any(ub => ub.UserId == userId))
            {
                throw new InvalidInputException("User is already a member of this buurt.", "BuurtMembership");
            }

            // Add user to buurt
            var userBuurt = new UserBuurt
            {
                UserId = userId,
                SectorCodeBuurt = buurt.StatistischeSectorCode
            };

            await uow.UserBuurtRepository.Insert(userBuurt);
            await uow.Save();
            
            await uow.CommitTransaction();
        }
        catch (Exception ex)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }
    
    public async Task LeaveBuurtAsync(string buurtId, string token)
    {
        await uow.StartTransaction();
        try
        {
            var userId = tokenService.GetUserIdFromToken(token);
            var user = await uow.UserRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new UnauthorizedException("User not found.", "User");
            }

            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(buurtId);
            if (buurt == null)
            {
                throw new ResourceNotFoundException($"Buurt with Statistische SectorCode '{buurtId}' not found.", "StatischeSectorCode");
            }

            var userBuurt = buurt.Bewoners.FirstOrDefault(ub => ub.UserId == userId);
            if (userBuurt == null)
            {
                throw new InvalidInputException("User is not a member of this buurt.", "BuurtMembership");
            }

            await uow.UserBuurtRepository.Delete(userBuurt);
            await uow.Save();

            await uow.CommitTransaction();
        }
        catch (Exception ex)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }
}