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
    /// <summary>
    /// Registers a new user with the provided registration details.
    /// </summary>
    /// <param name="command">The registration command containing user details.</param>
    /// <returns>
    /// An <see cref="ActionResult{UserDto}"/> containing the created <see cref="UserDto"/> on success
    /// or an appropriate error response handled by <see cref="ExceptionHandler"/>.
    /// </returns>
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

    /// <summary>
    /// Authenticates a user and returns an access token.
    /// </summary>
    /// <param name="command">The login command containing credentials.</param>
    /// <returns>
    /// An <see cref="ActionResult{TokenDto}"/> containing the authentication token on success
    /// or an appropriate error response handled by <see cref="ExceptionHandler"/>.
    /// </returns>
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

    /// <summary>
    /// Logs out the currently authenticated user by invalidating the provided bearer token.
    /// </summary>
    /// <returns>
    /// An <see cref="ActionResult{MessageResponseDto}"/> indicating success or an error response
    /// handled by <see cref="ExceptionHandler"/>.
    /// </returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
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

    /// <summary>
    /// Refreshes the access token using the current bearer token.
    /// </summary>
    /// <returns>
    /// An <see cref="ActionResult{TokenDto}"/> containing a new token on success
    /// or an appropriate error response handled by <see cref="ExceptionHandler"/>.
    /// </returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
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