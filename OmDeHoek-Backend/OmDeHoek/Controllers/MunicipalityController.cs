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
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Languages.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing a list of <see cref="MunicipalityDto" />.</returns>
    [HttpGet]
    public async Task<ActionResult<List<MunicipalityDto>>> GetAll([FromQuery] Languages? language)
    {
        try
        {
            var result = await gemeenteService.GetAllAsync(language ?? Languages.En);
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
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Languages.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing the matching <see cref="MunicipalityDto" />.</returns>
    [HttpGet("nis/{nisCode}")]
    public async Task<ActionResult<MunicipalityDto>> GetByNisCode(string nisCode, [FromQuery] Languages? language)
    {
        try
        {
            var result = await gemeenteService.GetByNisCodeAsync(nisCode, language ?? Languages.En);
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
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Languages.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing the matching <see cref="MunicipalityDto" />.</returns>
    [HttpGet("name/{name}")]
    public async Task<ActionResult<MunicipalityDto>> GetByNaam(string name, [FromQuery] Languages? language)
    {
        try
        {
            var result = await gemeenteService.GetByNaamAsync(name, language ?? Languages.En);
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
    /// <param name="language">Optional language to use for the returned data. Defaults to <see cref="Languages.En" /> when null.</param>
    /// <returns>An <see cref="ActionResult" /> containing a list of matching <see cref="MunicipalityDto" />.</returns>
    [HttpGet("postalcode/{postalcode}")]
    public async Task<ActionResult<List<MunicipalityDto>>> SearchByPostCode(string postalcode, [FromQuery] Languages? language)
    {
        try
        {
            var result = await gemeenteService.SearchByPostCodeAsync(postalcode, language ?? Languages.En);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}