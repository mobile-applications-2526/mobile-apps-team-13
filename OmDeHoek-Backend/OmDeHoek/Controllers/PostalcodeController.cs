using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.DTO;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostalcodeController(PostcodeService service) : ControllerBase
{
    /// <summary>
    ///     Returns a list of all postal codes.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<PostalcodeDto>>> GetAllPostcodes()
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