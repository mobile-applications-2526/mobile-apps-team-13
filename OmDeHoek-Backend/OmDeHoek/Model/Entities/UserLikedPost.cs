namespace OmDeHoek.Model.Entities;

public class UserLikedPost : IDataBaseEntity<UserLikedPost>
{
    public string UserId { get; set; } = null!;
    public Guid PostId { get; set; }
    public bool IsLiked { get; set; }
    public User User { get; set; } = null!;
    public Message Post { get; set; } = null!;

    public bool Equals(UserLikedPost? x, UserLikedPost? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(UserLikedPost obj)
    {
        return HashCode.Combine(UserId, PostId);
    }

    public bool Equals(UserLikedPost? other)
    {
        return !CheckNullOrWrongType(other)
               && UserId == other!.UserId
               && PostId == other.PostId;
    }

    public void Update(UserLikedPost? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same");
        IsLiked = entity?.IsLiked ?? IsLiked;
    }

    public bool HardEquals(UserLikedPost? other)
    {
        return Equals(other)
               && IsLiked == other?.IsLiked;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}