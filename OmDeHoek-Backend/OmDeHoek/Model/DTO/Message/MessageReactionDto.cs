using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO.Message;

public class MessageReactionDto
{
    public string Author { get; init; }
    public string Content { get; init; }
    public DateTime CreatedAt {get; init;}

    public MessageReactionDto(MessageReaction entity)
    {
        Author = entity.User!.UserName!;
        Content = entity.Reaction;
        CreatedAt = entity.CreatedAt;
    }
}