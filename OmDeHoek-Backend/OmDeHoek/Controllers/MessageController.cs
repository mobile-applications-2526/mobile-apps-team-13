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
    // POST api/message/send
    [HttpPost("send")]
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
}