using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/user
[ApiController]
[Route("api/[controller]")]
public class UserController(UserService userService) : ControllerBase
{
    /// <summary>
    /// Retrieves information about the currently logged-in user.
    /// </summary>
    /// <param name="taal">The language for the returned data. Defaults to <see cref="Talen.En"/>.</param>
    /// <returns>>An <see cref="ActionResult{UserDto}"/> containing the user information.</returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpGet("loggedin/{taal}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetLoggedInUser([FromRoute] Talen taal = Talen.En)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await userService.GetAccountInfo(token, taal);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}