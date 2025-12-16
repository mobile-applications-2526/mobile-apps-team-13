using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// Api path: api/gemeente
[ApiController]
[Route("api/[controller]")]
public class MunicipalityController(GemeenteService gemeenteService) : ControllerBase
{
    /// <summary>
    ///     Retrieves all gemeenten.
    /// </summary>
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Talen.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing a list of <see cref="GemeenteDto" />.</returns>
    [HttpGet]
    public async Task<ActionResult<List<GemeenteDto>>> GetAll([FromQuery] Talen? language)
    {
        try
        {
            var result = await gemeenteService.GetAllAsync(language ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Retrieves a single gemeente by its NIS code.
    /// </summary>
    /// <param name="nisCode">The NIS code of the gemeente to retrieve.</param>
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Talen.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing the matching <see cref="GemeenteDto" />.</returns>
    [HttpGet("nis/{nisCode}")]
    public async Task<ActionResult<GemeenteDto>> GetByNisCode(string nisCode, [FromQuery] Talen? language)
    {
        try
        {
            var result = await gemeenteService.GetByNisCodeAsync(nisCode, language ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Retrieves a single gemeente by its name.
    /// </summary>
    /// <param name="name">The name of the gemeente to retrieve.</param>
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Talen.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing the matching <see cref="GemeenteDto" />.</returns>
    [HttpGet("name/{name}")]
    public async Task<ActionResult<GemeenteDto>> GetByNaam(string name, [FromQuery] Talen? language)
    {
        try
        {
            var result = await gemeenteService.GetByNaamAsync(name, language ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Searches for municipality by postal code.
    /// </summary>
    /// <param name="postalcode">The postal code to search for.</param>
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Talen.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing a list of matching <see cref="GemeenteDto" />.</returns>
    [HttpGet("postalcode/{postalcode}")]
    public async Task<ActionResult<List<GemeenteDto>>> SearchByPostCode(string postalcode, [FromQuery] Talen? language)
    {
        try
        {
            var result = await gemeenteService.SearchByPostCodeAsync(postalcode, language ?? Talen.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}