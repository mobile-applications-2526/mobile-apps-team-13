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
    // GET api/buurt/sectorcode/{sectorcode}/{taal}
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
    
    // GET api/buurt/deelgemeente/{nis6Code}/{taal}
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
}