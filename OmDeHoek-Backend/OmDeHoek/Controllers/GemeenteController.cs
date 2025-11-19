using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// Api path: api/gemeente
[ApiController]
[Route("api/[controller]")]
public class GemeenteController(GemeenteService gemeenteService) : ControllerBase
{
    /// <summary>
    /// Retrieves all gemeenten.
    /// </summary>
    /// <param name="taal">Optional language to use for the returned data. Defaults to <see cref="Talen.En"/> when null.</param>
    /// <returns>An <see cref="ActionResult"/> containing a list of <see cref="GemeenteDto"/>.</returns>
    [HttpGet]
    public async Task<ActionResult<List<GemeenteDto>>> GetAll([FromQuery] Talen? taal)
    {
        try
        {
            var result = await gemeenteService.GetAllAsync(taal ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    /// <summary>
    /// Retrieves a single gemeente by its NIS code.
    /// </summary>
    /// <param name="nisCode">The NIS code of the gemeente to retrieve.</param>
    /// <param name="taal">Optional language to use for the returned data. Defaults to <see cref="Talen.En"/> when null.</param>
    /// <returns>An <see cref="ActionResult"/> containing the matching <see cref="GemeenteDto"/>.</returns>
    [HttpGet("nis/{nisCode}")]
    public async Task<ActionResult<GemeenteDto>> GetByNisCode(string nisCode, [FromQuery] Talen? taal)
    {
        try
        {
            var result = await gemeenteService.GetByNisCodeAsync(nisCode, taal ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    /// <summary>
    /// Retrieves a single gemeente by its name.
    /// </summary>
    /// <param name="naam">The name of the gemeente to retrieve.</param>
    /// <param name="taal">Optional language to use for the returned data. Defaults to <see cref="Talen.En"/> when null.</param>
    /// <returns>An <see cref="ActionResult"/> containing the matching <see cref="GemeenteDto"/>.</returns>
    [HttpGet("naam/{naam}")]
    public async Task<ActionResult<GemeenteDto>> GetByNaam(string naam, [FromQuery] Talen? taal)
    {
        try
        {
            var result = await gemeenteService.GetByNaamAsync(naam, taal ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    /// <summary>
    /// Searches for gemeenten by postcode.
    /// </summary>
    /// <param name="postCode">The postcode to search for.</param>
    /// <param name="taal">Optional language to use for the returned data. Defaults to <see cref="Talen.En"/> when null.</param>
    /// <returns>An <see cref="ActionResult"/> containing a list of matching <see cref="GemeenteDto"/>.</returns>
    [HttpGet("postcode/{postCode}")]
    public async Task<ActionResult<List<GemeenteDto>>> SearchByPostCode(string postCode, [FromQuery] Talen? taal)
    {
        try
        {
            var result = await gemeenteService.SearchByPostCodeAsync(postCode, taal ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}