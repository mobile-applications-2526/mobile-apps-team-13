using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model;
using OmDeHoek.Model.DTO;
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
    public async Task<UserDto> GetAccountInfo(string token, Talen taal = Talen.En)
    {
        var id = tokenService.GetUserIdFromToken(token);
        if (string.IsNullOrEmpty(id))
        {
            throw new UnauthorizedException("Invalid token", "auth/invalid-token");
        }
        
        var user = await uow.UserRepository.GetByIdAsync(id);
        if (user == null)
        {
            throw new ResourceNotFoundException("User not found", "userId");
        }
        return new UserDto(user, taal);
    }
}