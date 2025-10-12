using Microsoft.AspNetCore.Mvc;
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
    public async Task<ActionResult> GetAll(Talen? taal)
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
}