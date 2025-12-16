using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model;
using OmDeHoek.Model.Commands.Adressen;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class AdresService(
    UnitOfWork uow,
    TokenService tokenService,
    UserManager<User> userManager
)
{
    public async Task<AddressDto> RegisterNewAdresAsync(InsertAddress newAddress, string token)
    {
        try
        {
            await uow.StartTransaction();

            var idInToken = tokenService.GetUserIdFromToken(token.Trim());
            if (idInToken == null) throw new UnauthorizedException("Invalid token", "token");

            if (idInToken != newAddress.ResidentId)
                throw new ForbiddenActionException("You are not allowed to add an address for another user", "token");

            var bewoner = await uow.UserRepository.GetById(newAddress.ResidentId);

            if (bewoner == null)
                throw new ResourceNotFoundException($"No user found with id '{newAddress.ResidentId}'", "residentId");

            if (string.IsNullOrWhiteSpace(newAddress.Street))
                throw new MissingDataException("straat is missing or only spaces", "street");

            var postcode = newAddress.PostalCode.Trim();
            if (string.IsNullOrWhiteSpace(postcode) || postcode.Length != 4 || !postcode.All(char.IsDigit))
                throw new InvalidInputException("postcode must be a 4-digit number", "postalCode");

            var storedPostcode = await uow.PostcodeRepository.GetByCodeAsync(postcode);
            if (storedPostcode == null)
                throw new ResourceNotFoundException($"No postal code found with code '{postcode}'", "postalCode");

            var gemeenteTaal = storedPostcode.Gemeente.GesprokenTalen.ToCharArray()[0];
            var dorpNaam = gemeenteTaal switch
            {
                'N' => storedPostcode.Gemeente.NaamNl,
                'F' => storedPostcode.Gemeente.NaamFr,
                'D' => storedPostcode.Gemeente.NaamDe,
                _ => storedPostcode.Gemeente.NaamNl
            };

            var adres = new Adres
            {
                Bewoner = bewoner,
                Straat = newAddress.Street.Trim(),
                Huisnummer = string.IsNullOrWhiteSpace(newAddress.HouseNumber) ? null : newAddress.HouseNumber.Trim(),
                Postcode = postcode,
                Dorp = dorpNaam!
            };

            var storedAdres = await uow.AdresRepository.Insert(adres);

            await uow.Save();

            await uow.CommitTransaction();
            return new AddressDto(storedAdres);
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<List<AddressDto>> GetAdressenByUserIdAsync(string token)
    {
        var userId = tokenService.GetUserIdFromToken(token.Trim());
        if (userId == null) throw new UnauthorizedException("Invalid token", "token");

        var bewoner = await uow.UserRepository.GetById(userId);

        if (bewoner == null) throw new ResourceNotFoundException($"No user found with id '{userId}'", "userId");

        var adressen = await uow.AdresRepository.GetByUserId(userId);
        return adressen.Select(a => new AddressDto(a)).ToList();
    }
}