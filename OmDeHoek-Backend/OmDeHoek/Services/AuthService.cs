using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model;
using OmDeHoek.Model.Commands.auth;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.DTO.User;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public partial class AuthService(
    UnitOfWork uow,
    TokenManager tokenManager,
    TokenService tokenService,
    UserManager<User> userManager
    )
{
    private readonly int _minimumOnlineLeeftijd = 13;
    
    public async Task<UserDto> RegisterAsync(RegisterUser newUser)
    {
        try
        {
            await uow.StartTransaction();

            if (string.IsNullOrWhiteSpace(newUser.Voornaam))
            {
                throw new MissingDataException("Voornaam is missing or only spaces", "voornaam");
            }
            
            if (string.IsNullOrWhiteSpace(newUser.Achternaam))
            {
                throw new MissingDataException("Achternaam is missing or only spaces", "achternaam");
            }

            if (string.IsNullOrWhiteSpace(newUser.Password))
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

            if (newUser.Password.Trim().Length < 3 || newUser.Password.Trim().Length > 31)
            {
                throw new InvalidInputException("password must be between 3 and 31 characters", "password");
            }
            
            if(newUser.BirthDate > DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-_minimumOnlineLeeftijd)))
            {
                throw new InvalidInputException($"you must be at least {_minimumOnlineLeeftijd} years old to register", "birthDate");
            }
            
            var username = await GenerateUniqueUsername(newUser.Voornaam, newUser.Achternaam);

            User user = new()
            {
                UserName = username,
                Email = newUser.Email,
                Role = Roles.User,
                NormalizedEmail = newUser.Email.ToUpper(),
                NormalizedUserName = username.ToUpper(),
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
            
            var (refreshTokenPlain, encryptedRefreshToken) = tokenService.CreateRefreshToken();
            
            var refreshToken = new RefreshToken
            {
                TokenHash = encryptedRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMonths(1),
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow,
                Id = Guid.NewGuid(),
                IsRevoked = false
            };
            
            await uow.RefreshTokenRepository.Insert(refreshToken);
            
            await uow.Save();

            await uow.CommitTransaction();

            return new TokenDto
            {
                Token = token,
                Email = user.Email!,
                Id = user.Id,
                RefreshToken = refreshTokenPlain
            };
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<bool> LogoutAsync(LogoutCommand token)
    {
        try
        {
            await uow.StartTransaction();
            
            var refreshToken = token.RefreshToken;
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return true;
            }
            
            var hashedToken = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(refreshToken)));
            var refreshTokenInDb = await uow.RefreshTokenRepository.GetByTokenAsync(hashedToken);
            
            if (refreshTokenInDb == null || refreshTokenInDb.IsRevoked)
            {
                return true;
            }
            
            refreshTokenInDb.IsRevoked = true;
            uow.RefreshTokenRepository.Update(refreshTokenInDb);
            await uow.Save();
            await uow.CommitTransaction();

            return true;
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<TokenDto> RefreshToken(RefreshTokenCommand command)
    {
        await uow.StartTransaction();
        try
        {
            var token = command.RefreshToken;

            if (string.IsNullOrWhiteSpace(token))
            {
                throw new MissingDataException("token is missing or only spaces", "token");
            }
        
            var bytes = Encoding.UTF8.GetBytes(token);
            var hash = SHA256.HashData(bytes);
            var hashedToken = Convert.ToBase64String(hash);
        
            var refreshTokenInDb = await uow.RefreshTokenRepository.GetByTokenAsync(hashedToken);
        
            if (refreshTokenInDb == null || refreshTokenInDb.IsRevoked || refreshTokenInDb.ExpiresAt < DateTime.UtcNow || refreshTokenInDb.User == null)
            {
                throw new UnauthorizedException("invalid refresh token", "token");
            }
            
            var userInDb = refreshTokenInDb.User;

            var newToken = tokenService.CreateToken(userInDb);
            
            var (newRefreshTokenPlain, newEncryptedRefreshToken) = tokenService.CreateRefreshToken();
            var newRefreshToken = new RefreshToken
            {
                TokenHash = newEncryptedRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMonths(1),
                UserId = userInDb.Id,
                CreatedAt = DateTime.UtcNow,
                Id = Guid.NewGuid(),
                IsRevoked = false
            };
            
            await uow.RefreshTokenRepository.Insert(newRefreshToken);

            refreshTokenInDb.IsRevoked = true;
            uow.RefreshTokenRepository.Update(refreshTokenInDb);

            await uow.Save();
            await uow.CommitTransaction();
            
            return new TokenDto
            {
                Token = newToken,
                Email = userInDb.Email!,
                Id = userInDb.Id,
                RefreshToken = newRefreshTokenPlain
            };
        }
        catch (Exception e)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    #region Helper functions

    private async Task<string> GenerateUniqueUsername(string voornaam, string achternaam)
    {
        var cleanVoornaam = CleanString(voornaam);
        var cleanAchternaam = CleanString(achternaam);
        
        var baseUsername = $"{cleanVoornaam}{cleanAchternaam}";
        
        var uniqueUsername = baseUsername;
        var counter = 1;

        while (await userManager.FindByNameAsync(uniqueUsername) != null)
        {
            uniqueUsername = $"{baseUsername}{counter}";
            counter++;
        }

        return uniqueUsername;
    }

    private string CleanString(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        var textInfo = new CultureInfo("nl-NL", false).TextInfo;
        input = textInfo.ToTitleCase(input.ToLower());

        var normalizedString = input.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in from c in normalizedString let unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c) where unicodeCategory != UnicodeCategory.NonSpacingMark select c)
        {
            stringBuilder.Append(c);
        }

        var cleanText = stringBuilder.ToString().Normalize(NormalizationForm.FormC);

        return MyRegex().Replace(cleanText, "");
    }

    [GeneratedRegex("[^a-zA-Z0-9]")]
    private static partial Regex MyRegex();

    #endregion
}