using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OmDeHoek.Model.Entities;

public class UserBuurt : IDataBaseEntity<UserBuurt>
{
    public string UserId { get; set; } = string.Empty; // Foreign key
    public User? User { get; init; }
    [MaxLength(9)]
    public string SectorCodeBuurt { get; set; } = string.Empty; // Foreign key
    public Buurt? Buurt { get; init; }
    
    public UserBuurt() {}

    public UserBuurt(
        User user,
        Buurt buurt
    )
    {
        User = user;
        UserId = user.Id;
        Buurt = buurt;
        SectorCodeBuurt = buurt.StatistischeSectorCode;
    }

    public bool Equals(UserBuurt? other)
    {
        return !CheckNullOrWrongType(other) 
               && UserId == other!.UserId
               && SectorCodeBuurt == other.SectorCodeBuurt;
    }

    public void Update(UserBuurt? entity)
    {
        if(!Equals(entity)) throw new ArgumentException("Entities are not the same");
        UserId = entity?.UserId ?? UserId;
        SectorCodeBuurt = entity?.SectorCodeBuurt ?? SectorCodeBuurt;
    }

    public bool HardEquals(UserBuurt? other)
    {
        return Equals(other) 
               && UserId == other!.UserId
               && SectorCodeBuurt == other.SectorCodeBuurt;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}