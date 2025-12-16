using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace OmDeHoek.Model.Entities;

public class RefreshToken() : IDataBaseEntity<RefreshToken>
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;
    [Required]
    public string TokenHash { get; set; } = string.Empty;

    [Required]
    public DateTime ExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsRevoked { get; set; } = false;

    public virtual User User { get; set; }

    public bool Equals(RefreshToken? other)
    {
        return !CheckNullOrWrongType(other)
               && Id == other!.Id;
    }

    public void Update(RefreshToken? entity)
    {
        if (!Equals(entity)) return;
        ExpiresAt = entity!.ExpiresAt;
        IsRevoked = entity.IsRevoked;
    }

    public bool HardEquals(RefreshToken? other)
    {
        return Equals(other)
            && UserId == other!.UserId
            && TokenHash == other.TokenHash
            && ExpiresAt == other.ExpiresAt
            && CreatedAt == other.CreatedAt
            && IsRevoked == other.IsRevoked;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }

    public bool Equals(RefreshToken? x, RefreshToken? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(RefreshToken obj)
    {
        return HashCode.Combine(Id);
    }
}