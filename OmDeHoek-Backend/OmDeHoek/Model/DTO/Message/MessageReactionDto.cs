using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO;

public class MessageReactionDto
{
    //fuck likes
    public string Author { get; init; }
    public string Content { get; init; }

    public MessageReactionDto(MessageReaction entity)
    {
        Author = entity.User!.UserName!;
        Content = entity.Reaction;
    }
}