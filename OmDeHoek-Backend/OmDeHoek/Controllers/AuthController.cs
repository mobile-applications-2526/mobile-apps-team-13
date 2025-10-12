using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.DTO;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// route: api/auth
[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    // route: api/auth/register
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUser command)
    {
        try
        {
            var result = await authService.RegisterAsync(command);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return ExceptionHandler.HandleException(ex);
        }
    }
    
    // route: api/auth/login
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<TokenDto>> Login([FromBody] LoginUser command)
    {
        try
        {
            var result = await authService.LoginAsync(command);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    // route: api/auth/logout
    [HttpPost("logout")]
    [Authorize]
    public async Task<ActionResult<MessageResponseDto>> Logout()
    {
        try
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            await authService.LogoutAsync(token);
            return Ok(new MessageResponseDto("Successfully logged out"));
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    // route: api/auth/refresh
    [HttpPost("refresh")]
    [Authorize]
    public async Task<ActionResult<TokenDto>> Refresh()
    {
        try
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await authService.RefreshToken(token);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}