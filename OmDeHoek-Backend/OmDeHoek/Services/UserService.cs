using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.DTO.User;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class UserService(
    UnitOfWork uow,
    TokenService tokenService,
    UserManager<User> userManager
    )
{
    public async Task<UserDto> GetAccountInfo(string token, Languages taal = Languages.En)
    {
        return new UserDto(await GetUserFromToken(token), taal);
    }

    public async Task<UserDto> UpdateAccountInfo(string token, UpdateUser updatedValues, Languages taal = Languages.En)
    {
        var user = await GetUserFromToken(token);

        updatedValues.Validate();

        try
        {
            await uow.StartTransaction();

            if (
                updatedValues.Email is not null // wel null -> moet niet geupdate worden
                && updatedValues.Email !=
                user.Email // als email gelijk is mag het maar gaat de gebruiker alsnog bestaan
                && await uow.UserRepository.GetByEmailAsync(updatedValues.Email) !=
                null // als er een gebruiker bestaat met het nieuwe email adres, kan de gebruiker niet gemaakt worden
            )
            {
                throw new InvalidInputException("Gebruiker met gegeven email adres bestaat al", "email");
            }

            if (
                updatedValues.Username is not null
                && updatedValues.Username != user.UserName
                && await uow.UserRepository.GetByUserNameAsync(updatedValues.Username) != null
            )
            {
                throw new InvalidInputException("Gebruiker met gegeven gebruikersnaam bestaat al", "Username");
            }

            user.Email = updatedValues.Email ?? user.Email;
            user.NormalizedEmail = updatedValues.Email is null
                ? user.NormalizedEmail
                : updatedValues.Email.ToUpper();

            user.UserName = updatedValues.Username ?? user.UserName;
            user.NormalizedUserName = updatedValues.Username is null
                ? user.NormalizedUserName
                : updatedValues.Username.ToUpper();

            user.PhoneNumber = updatedValues.PhoneNumber ?? user.PhoneNumber;
            
            user.Voornaam = updatedValues.FirstName ?? user.Voornaam;
            user.Achternaam = updatedValues.LastName ?? user.Achternaam;

            await userManager.UpdateAsync(user);
            
            var newUser = uow.UserRepository.Update(user);

            await uow.Save();
            await uow.CommitTransaction();

            return new UserDto(newUser, taal);
        }
        catch (Exception e)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    #region helper functies

    /// <summary>
    /// Haalt het user object uit de databank gelinkt aan de user waarvan het ID in het token verwerkt staat
    /// </summary>
    /// <param name="token">Bearer token (zonder "Bearer" gedeelte</param>
    /// <returns>Het user object gelinkt aan het Bearer token</returns>
    /// <exception cref="UnauthorizedException">Als het ID in het token een lege string voorstelt of er geen user is gelinkt aan het id in het bearer token</exception>
    private async Task<User> GetUserFromToken(string token)
    {
        var id = tokenService.GetUserIdFromToken(token);
        if (string.IsNullOrEmpty(id))
        {
            throw new UnauthorizedException("Invalid token", "auth/invalid-token");
        }

        return await uow.UserRepository.GetByIdAsync(id) ?? throw new UnauthorizedException("Invalid token", "auth/invalid-token");
    }

    #endregion
}