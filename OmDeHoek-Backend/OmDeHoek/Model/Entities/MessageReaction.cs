namespace OmDeHoek.Model.Entities;

public class MessageReaction : IDataBaseEntity<MessageReaction>
{
    public Guid Id { get; set; }
    public Guid MessageId { get; set; }
    public Message Message { get; set; } = null!;
    public string UserId { get; set; }
    public User User { get; set; } = null!;
    public string Reaction { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public MessageReaction() { }

    public MessageReaction(Guid messageId, string userId, string reaction)
    {
        Id = Guid.NewGuid();
        MessageId = messageId;
        UserId = userId;
        Reaction = reaction;
    }

    public void Update(MessageReaction? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same");
        Reaction = entity!.Reaction;
    }

    public bool Equals(MessageReaction? other)
    {
        if (CheckNullOrWrongType(other)) return false;
        return Id == other!.Id;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        if (other is null) return true;
        return GetType() != other.GetType();
    }

    public bool HardEquals(MessageReaction? other)
    {
        return Equals(other) && MessageId == other!.MessageId && UserId == other.UserId && Reaction == other.Reaction;
    }

    public bool Equals(MessageReaction? x, MessageReaction? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(MessageReaction obj)
    {
        return HashCode.Combine(Id);
    }
}