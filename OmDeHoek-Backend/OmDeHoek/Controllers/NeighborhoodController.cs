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
public class NeighborhoodController(BuurtService buurtService) : ControllerBase
{
    /// <summary>
    ///     Retrieve a single buurt by its statistical sector code.
    /// </summary>
    /// <param name="sectorcode">The statistical sector code of the buurt.</param>
    /// <param name="language">Optional language for the returned data. Defaults to <see cref="Talen.En" /> when not provided.</param>
    /// <returns>
    ///     An <see cref="ActionResult{BuurtDto}" /> containing the requested buurt on success,
    ///     or an appropriate error response produced by <see cref="ExceptionHandler.HandleException" />.
    /// </returns>
    [HttpGet("sectorcode/{sectorcode}")]
    public async Task<ActionResult<NeighborhoodDto>> GetBuurtBySectorcode(string sectorcode, [FromQuery] Talen? language)
    {
        try
        {
            var buurt = await buurtService.GetByStatistischeSectorCodeAsync(sectorcode, language ?? Talen.En);
            return Ok(buurt);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }


    /// <summary>
    ///     Retrieve all buurten for a given deelgemeente (by NIS6 code).
    /// </summary>
    /// <param name="nis6Code">The NIS6 code of the deelgemeente.</param>
    /// <param name="language">Optional language for the returned data. Defaults to <see cref="Talen.En" /> when not provided.</param>
    /// <returns>
    ///     An
    ///     <see>
    ///         <cref>ActionResult{List{BuurtDto}}</cref>
    ///     </see>
    ///     containing the list of buurten on success,
    ///     or an appropriate error response produced by <see cref="ExceptionHandler.HandleException" />.
    /// </returns>
    [HttpGet("deelgemeente/{nis6Code}")]
    public async Task<ActionResult<List<NeighborhoodDto>>> GetBuurtenByDeelGemeenteNis6Code(string nis6Code,
        [FromQuery] Talen? language)
    {
        try
        {
            var buurten = await buurtService.GetByDeelGemeenteNis6CodeAsync(nis6Code, language ?? Talen.En);
            return Ok(buurten);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Retrieve all buurten for a given gemeente (by NIS code).
    /// </summary>
    /// <param name="nisCode">The NIS code of the gemeente.</param>
    /// <param name="language">Optional language for the returned data. Defaults to <see cref="Talen.En" /> when not provided.</param>
    /// <returns>
    ///     An <see cref="ActionResult{List{BuurtDto}}" /> containing the list of buurten on success,
    ///     or an appropriate error response produced by <see cref="ExceptionHandler.HandleException" />.
    /// </returns>
    [HttpGet("municipality/{nisCode}")]
    public async Task<ActionResult<List<NeighborhoodDto>>> GetBuurtenByGemeenteNisCode(string nisCode,
        [FromQuery] Talen? language)
    {
        try
        {
            var buurten = await buurtService.GetByGemeenteNisCodeAsync(nisCode, language ?? Talen.En);
            return Ok(buurten);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Adds the authenticated user to the specified buurt.
    /// </summary>
    /// <param name="neighborhoodId">The identifier of the buurt to join.</param>
    /// <returns>
    ///     An <see cref="ActionResult{MessageResponseDto}" /> indicating success or an appropriate error response.
    /// </returns>
    /// <remarks>
    ///     Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("join/{neighborhoodId}")]
    [Authorize]
    public async Task<ActionResult<MessageResponseDto>> JoinBuurt(string neighborhoodId)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            await buurtService.JoinBuurtAsync(neighborhoodId, token);
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
    ///     Removes the authenticated user from the specified buurt.
    /// </summary>
    /// <param name="neighborhoodId">The identifier of the buurt to leave.</param>
    /// <returns>
    ///     An <see cref="ActionResult{MessageResponseDto}" /> indicating success or an appropriate error response.
    /// </returns>
    /// <remarks>
    ///     Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("leave/{neighborhoodId}")]
    [Authorize]
    public async Task<ActionResult<MessageResponseDto>> LeaveBuurt(string neighborhoodId)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            await buurtService.LeaveBuurtAsync(neighborhoodId, token);
            return Ok(
                new MessageResponseDto("Successfully left the buurt")
            );
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Get the list of neighborhoods that belong to the municipality with the given postal code
    /// </summary>
    /// <param name="postalcode">The postal code of the municipality</param>
    /// <param name="language">The language in which neighborhoods should be returned (default: English)</param>
    /// <returns>A list of neighborhoods within the municipality with the given postal code</returns>
    [HttpGet("postalcode/{postalcode}")]
    public async Task<ActionResult<List<NeighborhoodDto>>> GetBuurtenInPostcode(string postalcode,
        [FromQuery] Talen? language)
    {
        try
        {
            var result = await buurtService.GetByPostcode(postalcode, language ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}