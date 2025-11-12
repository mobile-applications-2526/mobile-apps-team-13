using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostcodeController(PostcodeService service): ControllerBase
{
    /// <summary>
    /// Geeft een lijst van alle postcodes terug.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<PostcodeDto>>> GetAllPostcodes()
    {
        try
        {
            var result = await service.GetAllPostcodesAsync();
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}