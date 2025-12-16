using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.Adressen;
using OmDeHoek.Model.DTO;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/adres
[ApiController]
[Route("api/[controller]")]
public class AddressController(AdresService adresService) : ControllerBase
{
    // POST api/adres
    /// <summary>
    ///     Registers a new address for the authenticated user.
    ///     The request must include a Bearer token in the Authorization header.
    /// </summary>
    /// <param name="address">Address data to insert.</param>
    /// <returns>
    ///     ActionResult containing the created <see cref="AddressDto" /> on success,
    ///     or an error ActionResult produced by <see cref="ExceptionHandler" /> on failure.
    /// </returns>
    /// <remarks>
    ///     Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<AddressDto>> RegisterNewAdres([FromBody] InsertAddress address)
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await adresService.RegisterNewAdresAsync(address, token);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    // GET api/adres/byLoggedInUser
    /// <summary>
    ///     Retrieves all addresses associated with the currently authenticated user.
    ///     The request must include a Bearer token in the Authorization header.
    /// </summary>
    /// <returns>
    ///     ActionResult containing a list of <see cref="AddressDto" /> for the logged-in user,
    ///     or an error ActionResult produced by <see cref="ExceptionHandler" /> on failure.
    /// </returns>
    /// <remarks>
    ///     Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpGet("byLoggedInUser")]
    [Authorize]
    public async Task<ActionResult<List<AddressDto>>> GetAdressenByUserId()
    {
        try
        {
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var result = await adresService.GetAdressenByUserIdAsync(token);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}