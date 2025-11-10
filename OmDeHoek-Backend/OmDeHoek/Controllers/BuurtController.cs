using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/buurt
[ApiController]
[Route("api/[controller]")]
public class BuurtController(BuurtService buurtService) : ControllerBase
{
    /// <summary>
    /// Retrieve a single buurt by its statistical sector code.
    /// </summary>
    /// <param name="sectorcode">The statistical sector code of the buurt.</param>
    /// <param name="taal">Optional language for the returned data. Defaults to <see cref="Talen.En"/> when not provided.</param>
    /// <returns>
    /// An <see cref="ActionResult{BuurtDto}"/> containing the requested buurt on success,
    /// or an appropriate error response produced by <see cref="ExceptionHandler.HandleException"/>.
    /// </returns>
    [HttpGet("sectorcode/{sectorcode}/{taal?}")]
    public async Task<ActionResult<BuurtDto>> GetBuurtBySectorcode(string sectorcode, Talen? taal)
    {
        try
        {
            var buurt = await buurtService.GetByStatistischeSectorCodeAsync(sectorcode, taal ?? Talen.En);
            return Ok(buurt);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }


    /// <summary>
    /// Retrieve all buurten for a given deelgemeente (by NIS6 code).
    /// </summary>
    /// <param name="nis6Code">The NIS6 code of the deelgemeente.</param>
    /// <param name="taal">Optional language for the returned data. Defaults to <see cref="Talen.En"/> when not provided.</param>
    /// <returns>
    /// An <see cref="ActionResult{List{BuurtDto}}"/> containing the list of buurten on success,
    /// or an appropriate error response produced by <see cref="ExceptionHandler.HandleException"/>.
    /// </returns>
    [HttpGet("deelgemeente/{nis6Code}/{taal?}")]
    public async Task<ActionResult<List<BuurtDto>>> GetBuurtenByDeelGemeenteNis6Code(string nis6Code, Talen? taal)
    {
        try
        {
            var buurten = await buurtService.GetByDeelGemeenteNis6CodeAsync(nis6Code, taal ?? Talen.En);
            return Ok(buurten);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    /// Retrieve all buurten for a given gemeente (by NIS code).
    /// </summary>
    /// <param name="nisCode">The NIS code of the gemeente.</param>
    /// <param name="taal">Optional language for the returned data. Defaults to <see cref="Talen.En"/> when not provided.</param>
    /// <returns>
    /// An <see cref="ActionResult{List{BuurtDto}}"/> containing the list of buurten on success,
    /// or an appropriate error response produced by <see cref="ExceptionHandler.HandleException"/>.
    /// </returns>
    [HttpGet("gemeente/{nisCode}/{taal?}")]
    public async Task<ActionResult<List<BuurtDto>>> GetBuurtenByGemeenteNisCode(string nisCode, Talen? taal)
    {
        try
        {
            var buurten = await buurtService.GetByGemeenteNisCodeAsync(nisCode, taal ?? Talen.En);
            return Ok(buurten);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    /// Adds the authenticated user to the specified buurt.
    /// </summary>
    /// <param name="buurtId">The identifier of the buurt to join.</param>
    /// <returns>
    /// An <see cref="ActionResult{MessageResponseDto}"/> indicating success or an appropriate error response.
    /// </returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("join/{buurtId}")]
    [Authorize]
    public async Task<ActionResult<MessageResponseDto>> JoinBuurt(string buurtId)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            await buurtService.JoinBuurtAsync(buurtId, token);
            return Ok(
                new MessageResponseDto("Successfully joined the buurt")
            );
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    /// Removes the authenticated user from the specified buurt.
    /// </summary>
    /// <param name="buurtId">The identifier of the buurt to leave.</param>
    /// <returns>
    /// An <see cref="ActionResult{MessageResponseDto}"/> indicating success or an appropriate error response.
    /// </returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("leave/{buurtId}")]
    [Authorize]
    public async Task<ActionResult<MessageResponseDto>> LeaveBuurt(string buurtId)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            await buurtService.LeaveBuurtAsync(buurtId, token);
            return Ok(
                new MessageResponseDto("Successfully left the buurt")
            );
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}