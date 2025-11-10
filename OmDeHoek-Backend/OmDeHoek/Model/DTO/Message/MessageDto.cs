using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO.Message;

public class MessageDto
{
    public string UserName { get; set; } = "";
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public MessageSeverity Severity { get; set; }

    public MessageDto() { }

    public MessageDto(Entities.Message message)
    {
        UserName = message.User?.UserName ?? "Onbekend";
        Content = message.Content;
        CreatedAt = message.CreatedAt;
        Severity = message.Severity;
    }
}