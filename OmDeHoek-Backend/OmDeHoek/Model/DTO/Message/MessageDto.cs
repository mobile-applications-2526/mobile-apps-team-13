using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO.Message;

public class MessageDto
{
    public string UserName { get; set; } = "";
    public string UserTag { get; set; } = "";
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public MessageSeverity Severity { get; set; }
    public List<MessageReactionDto> Reactions { get; set; }
    public uint TotalLikes { get; init; }

    public MessageDto() { }

    public MessageDto(Entities.Message message)
    {
        UserName = message.User is not null ? $"{message.User.Voornaam} {message.User.Achternaam}" : "verwijderd account";
        UserTag = message.User?.UserName ?? "unkown";
        Content = message.Content;
        CreatedAt = message.CreatedAt;
        Severity = message.Severity;
        Reactions = message.Comments
            .Select(r => new MessageReactionDto(r))
            .ToList();
    }
}