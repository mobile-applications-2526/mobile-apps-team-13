using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mobile_back_end.Model.Commands.User;
using Mobile_back_end.Services;
using Mobile_back_end.Utils;

namespace Mobile_back_end.Controllers;

// route: api/auth
[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    // route: api/auth/register
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register([FromBody] RegisterUser command)
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
    public async Task<ActionResult> Login([FromBody] LoginUser command)
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
    public async Task<ActionResult> Logout()
    {
        try
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            await authService.LogoutAsync(token);
            return Ok(new { message = "Logout successful" });
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    // route: api/auth/refresh
    [HttpPost("refresh")]
    [Authorize]
    public async Task<ActionResult> Refresh()
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