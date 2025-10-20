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