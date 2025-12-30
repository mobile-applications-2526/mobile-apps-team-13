using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Commands.Message;
using OmDeHoek.Model.DTO;
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
    /// <param name="message">
    ///  The message to send.
    /// </param>
    /// <returns>An <see cref="ActionResult{MessageDto}"/> containing the sent message.</returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// If neighborhoodOnly is true, the message will only be sent to users in the same neighborhood.
    /// If neighborhoodOnly is false, the message will be sent to all users in the same borough.
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
    /// <returns>>An <see>
    ///         <cref>ActionResult{List{MessageDto}}</cref>
    ///     </see>
    ///     containing the list of messages.</returns>
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
            var result = await service.GetFeedMessages(token: token, page: page, pageSize: pageSize, postcode: postcode,
                buurtSectorCode: buurtSectorCode);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///   Responds to a message.
    /// </summary>
    /// <param name="response">The response details.</param>
    /// <returns>An <see cref="ActionResult{MessageDto}"/> containing the response message.</returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("respond")]
    [Authorize]
    public async Task<ActionResult<MessageDto>> RespondToMessage([FromBody] RespondToMessage response)
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.RespondToMessage(token: token, response: response);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///   Likes a message.
    /// </summary>
    /// <param name="messageId">The ID of the message to like.</param>
    /// <returns>An <see cref="ActionResult{MessageDto}"/> containing the liked message.</returns>
    /// <remarks>
    /// Requires authentication. The Authorization header bearer token is forwarded to the service.
    /// </remarks>
    [HttpPost("like/{messageId}")]
    [Authorize]
    public async Task<ActionResult<MessageDto>> LikeMessage(Guid messageId)
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.LikeMessage(token: token, messageId: messageId);
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    /// <summary>
    ///     Retrieves a paginated list of messages posted by the logged-in user.
    /// </summary>
    /// <param name="page">The page number to retrieve (default: 0).</param>
    /// <param name="pageSize">The number of messages per page (default: 20).</param>
    /// <returns>An <see cref="ActionResult{List{MessageDto}}"/> containing the list of messages.</returns>
    [HttpGet("byLoggedInUser")]
    [Authorize]
    public async Task<ActionResult<List<MessageDto>>> GetMessagesByLoggedInUser([FromQuery] int page = 0,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.GetMessagesByUser(
                token: token,
                page: page,
                pageSize: pageSize
            );
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Get a message by its ID
    /// </summary>
    /// <param name="messageId">The id of the message to fetch</param>
    /// <returns>The message with the given id</returns>
    [HttpGet("{messageId}")]
    [Authorize]
    public async Task<ActionResult<MessageDto>> GetMessageById(Guid messageId)
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.GetMessageById(
                messageId: messageId,
                token: token
            );
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
    
    /// <summary>
    ///     Updateds existing message
    /// </summary>
    /// <param name="updateMessage">
    /// The message update details.
    /// </param>
    /// <returns> The updated message </returns>
    [HttpPut]
    [Authorize]
    public async Task<ActionResult<MessageDto>> UpdateMessage([FromBody] UpdateMessage updateMessage){
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await service.UpdateMessage(
                token: token,
                updateMessage: updateMessage
            );
            return Ok(result);
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }

    /// <summary>
    ///     Deletes a message by its ID for the authenticated user.
    /// </summary>
    /// <param name="messageId">
    /// The ID of the message to delete.
    /// </param>
    /// <returns>
    ///   An <see cref="ActionResult"/> indicating success or an error response
    /// </returns>
    [HttpDelete("{messageId}")]
    [Authorize]
    public async Task<ActionResult> DeleteMessage(Guid messageId)
    {
        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            await service.DeleteMessage(
                token: token,
                messageId: messageId
            );
            return Ok(new MessageResponseDto("Successfully deleted Message"));
        }
        catch (Exception e)
        {
            return ExceptionHandler.HandleException(e);
        }
    }
}