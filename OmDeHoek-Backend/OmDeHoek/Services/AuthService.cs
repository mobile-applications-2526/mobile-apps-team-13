using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class AuthService(
    UnitOfWork uow,
    TokenManager tokenManager,
    TokenService tokenService,
    UserManager<User> userManager
    )
{
    public async Task<UserDto> RegisterAsync(RegisterUser newUser)
    {
        try
        {
            await uow.StartTransaction();

            if (String.IsNullOrWhiteSpace(newUser.Username))
            {
                throw new MissingDataException("username is missing or only spaces", "username");
            }

            if (String.IsNullOrWhiteSpace(newUser.Password))
            {
                throw new MissingDataException("invalid password", "password");
            }

            if (!Utils.AuthUtils.IsValidEmail(newUser.Email))
            {
                throw new InvalidInputException("email is not in email format", "email");
            }

            if (await uow.UserRepository.GetByEmailAsync(newUser.Email) != null)
            {
                throw new DuplicateFieldException("emil already in use", "email");
            }

            if (newUser.Username.Trim().Length < 3 || newUser.Username.Trim().Length > 31)
            {
                throw new InvalidInputException("username must be between 3 and 31 characters", "username");
            }

            if (newUser.Password.Trim().Length < 3 || newUser.Password.Trim().Length > 31)
            {
                throw new InvalidInputException("password must be between 3 and 31 characters", "password");
            }

            User user = new()
            {
                UserName = newUser.Username,
                Email = newUser.Email,
                Role = Roles.User,
                NormalizedEmail = newUser.Email.ToUpper(),
                NormalizedUserName = newUser.Username.ToUpper(),
                PhoneNumber = newUser.PhoneNumber,
                PhoneNumberConfirmed = newUser.PhoneNumber != null,
                BirthDate = newUser.BirthDate
            };

            var result = await userManager.CreateAsync(user,
                newUser.Password!
            );

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                throw new CantCreateException("Could not create user: " + string.Join(", ", errors), "User");
            }

            await uow.CommitTransaction();

            return new UserDto(user);
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<TokenDto> LoginAsync(LoginUser login)
    {
        try
        {
            await uow.StartTransaction();

            if (!Utils.AuthUtils.IsValidEmail(login.Email))
            {
                throw new InvalidInputException("email is not in email format", "email");
            }

            var user = await uow.UserRepository.GetByEmailAsync(login.Email);
            if (user == null)
            {
                throw new UnauthorizedException("invalid credentials", "login");
            }

            var result = await userManager.CheckPasswordAsync(user, login.Password);
            if (!result)
            {
                throw new UnauthorizedException("invalid credentials", "login");
            }

            var token = tokenService.CreateToken(user);

            await uow.CommitTransaction();

            return new TokenDto
            {
                Token = token,
                Email = user.Email!,
                Id = user.Id
            };
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<bool> LogoutAsync(string? token)
    {
        try
        {
            tokenManager.AddToRevokedTokens(token);

            return true;
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<TokenDto> RefreshToken(string? token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            throw new MissingDataException("token is missing or only spaces", "token");
        }
        if (tokenManager.IsTokenRevoked(token!))
        {
            throw new UnauthorizedException("token has been revoked", "token");
        }

        var email = Utils.AuthUtils.GetTokenEmail(token);

        var userInDb = await uow.UserRepository.GetByEmailAsync(email);

        if (userInDb == null)
        {
            throw new UnauthorizedException("user not found", "User");
        }

        var newToken = tokenService.CreateToken(userInDb, true);
        tokenManager.AddToRevokedTokens(token);

        await uow.Save();
        return new TokenDto
        {
            Token = newToken,
            Email = userInDb.Email!,
            Id = userInDb.Id
        };
    }
}