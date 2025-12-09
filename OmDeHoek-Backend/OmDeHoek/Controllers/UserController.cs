using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.DTO.User;
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
    [HttpGet("loggedin")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetLoggedInUser([FromQuery] Talen taal = Talen.En)
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

    /// <summary>
    /// Update de gebruiker zijn velden.
    /// </summary>
    /// <param name="updateDetails">De velden die updated moeten worden met de nieuwe waarde (een veld null laten past het niet mee aan!)</param>
    /// <param name="taal">De taal die gebruikt moet worden gebruikt voor de namen van buurten op te halen (default: En)</param>
    /// <returns>De ge-update user</returns>
    [HttpPut("update")]
    public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UpdateUser updateDetails,
        [FromQuery] Talen taal = Talen.En)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await userService.UpdateAccountInfo(token, updateDetails, taal);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}