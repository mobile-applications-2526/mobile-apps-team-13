using Microsoft.AspNetCore.Mvc;

namespace OmDeHoek.Controllers;

[ApiController]
[Route("status")]
public class ApiStatusController : ControllerBase
{
    /// <summary>
    /// Simple endpoint to check if the API is running (and wake it up if it's sleeping).
    /// </summary>
    /// <returns>A string message indicating the API is running.</returns>
    [HttpGet]
    public ActionResult<string> GetStatus()
    {
        return Ok("API is awake and running.");
    }
}