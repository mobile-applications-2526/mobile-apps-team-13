using OmDeHoek.Model;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class BuurtService(UnitOfWork uow)
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
        
        var buurten = await uow.BuurtRepository.GetByDeelGemeenteNis6CodeAsync(nis6Code);
        
        if (buurten == null || !buurten.Any())
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
        
        var buurten = await uow.BuurtRepository.GetByGemeenteNisCodeAsync(nisCode);
        
        if (buurten == null || !buurten.Any())
        {
            throw new ResourceNotFoundException($"No buurten found for NIS code '{nisCode}'.", "NISCode");
        }
        return buurten.Select(b => new BuurtDto(b, taal)).ToList();
    }
}