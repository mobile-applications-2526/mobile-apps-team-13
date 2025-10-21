using System.ComponentModel.DataAnnotations;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.Entities;

public class Message() : IDataBaseEntity<Message>
{
    public string UserId { get; set; } = string.Empty; // Foreign key 
    public User? User { get; set; }
    
    [MaxLength(9)]
    public string BuurtSectorCode { get; set; } = string.Empty; // Foreign key
    public Buurt? Buurt { get; set; }
    
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public MessageSeverity? Severity { get; set; }
    public bool Equals(Message? other)
    {
        return !CheckNullOrWrongType(other)
               && UserId == other?.UserId
               && BuurtSectorCode == other?.BuurtSectorCode
               && CreatedAt == other?.CreatedAt;
    }
    
    public void Update(Message? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same", nameof(entity));
        Content = entity?.Content ?? Content;
    }
    
    public bool HardEquals(Message? other)
    {
        return Equals(other)
               && Content == other?.Content;
    }
    
    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}