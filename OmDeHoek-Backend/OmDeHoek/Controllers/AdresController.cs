using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.Adressen;
using OmDeHoek.Model.DTO;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/adres
[ApiController]
[Route("api/[controller]")]
public class AdresController(AdresService adresService) : ControllerBase
{
    // POST api/adres
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<AdresDto>> RegisterNewAdres([FromBody] InsertAdres adres)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await adresService.RegisterNewAdresAsync(adres, token);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    [HttpGet("byLoggedInUser")]
    [Authorize]
    public async Task<ActionResult<List<AdresDto>>> GetAdressenByUserId()
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await adresService.GetAdressenByUserIdAsync(token);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}