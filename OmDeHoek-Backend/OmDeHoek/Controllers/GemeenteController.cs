using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// Api path: api/gemeente
[ApiController]
[Route("api/[controller]")]
public class GemeenteController(GemeenteService gemeenteService): ControllerBase
{
    // GET: api/gemeente/{taal}
    [HttpGet("{taal?}")]
    public async Task<ActionResult<List<GemeenteDto>>> GetAll(Talen? taal)
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
    
    // GET: api/gemeente/nis/{nisCode}/{taal}
    [HttpGet("nis/{nisCode}/{taal?}")]
    public async Task<ActionResult<GemeenteDto>> GetByNisCode(string nisCode, Talen? taal)
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
    
    // GET: api/gemeente/naam/{naam}/{taal}
    [HttpGet("naam/{naam}/{taal?}")]
    public async Task<ActionResult<GemeenteDto>> GetByNaam(string naam, Talen? taal)
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
    
    // GET: api/gemeente/postcode/{postCode}/{taal}
    [HttpGet("postcode/{postCode}/{taal?}")]
    public async Task<ActionResult<List<GemeenteDto>>> SearchByPostCode(string postCode, Talen? taal)
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