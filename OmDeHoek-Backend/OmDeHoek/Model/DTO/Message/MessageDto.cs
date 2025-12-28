using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO.Message;

public class MessageDto
{
    public string UserName { get; set; } = "";
    public string UserTag { get; set; } = "";
    public string Content { get; set; } = "";
    public string Title { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public MessageSeverity Severity { get; set; }
    public List<MessageReactionDto> Reactions { get; set; }
    public uint TotalLikes { get; init; }
    public Guid Id { get; set; }
    public bool LikedByUser { get; set; } = false;

    public MessageDto() { }

    public MessageDto(Entities.Message message, bool likedByUser = false) 
    {
        LikedByUser = likedByUser;
        UserName = message.User is not null ? $"{message.User.Voornaam} {message.User.Achternaam}" : "verwijderd account";
        UserTag = message.User?.UserName ?? "unkown";
        Content = message.Content;
        CreatedAt = message.CreatedAt;
        Severity = message.Severity;
        Reactions = message.Comments
            .Select(r => new MessageReactionDto(r))
            .ToList();
        Title = message.Title;
        TotalLikes = (uint)message.LikedBy.Count;
        Id = message.Id;
    }
}