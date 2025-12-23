using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.Message;
using OmDeHoek.Model.DTO.Message;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/message
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessageController(MessageService service) : ControllerBase
{
    /// <summary>
    /// Sends a message.
    /// </summary>
    /// <param name="message">The message to send.</param>
    /// <returns>An <see cref="ActionResult{MessageDto}"/> containing the sent message.</returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("send")]
    [Authorize]
    public async Task<ActionResult<MessageDto>> SendMessage([FromBody] PostMessage message)
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.PostMessage(token: token, message: message);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Retrieves a paginated list of messages for the authenticated user's feed.
    /// </summary>
    /// <param name="page">The page number to retrieve (default: 0).</param>
    /// <param name="pageSize">The number of messages per page (default: 20).</param>
    /// <param name="postcode">Optional postcode to filter messages.</param>
    /// <param name="buurtSectorCode">Optional buurt sector code to filter messages.</param>
    /// <returns>>An <see cref="ActionResult{List{MessageDto}}"/> containing the list of messages.</returns>
    /// <remarks>
    ///     Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpGet("feed")]
    [Authorize]
    public async Task<ActionResult<List<MessageDto>>> GetFeedMessages(
        [FromQuery] int page = 0,
        [FromQuery] int pageSize = 20, 
        [FromQuery] string? postcode = null, 
        [FromQuery] string? buurtSectorCode = null
        )
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.GetFeedMessages(token: token, page: page, pageSize: pageSize, postcode: postcode, buurtSectorCode: buurtSectorCode);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}