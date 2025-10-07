using Microsoft.AspNetCore.Identity;
using Mobile_back_end.Model.Enums;

namespace Mobile_back_end.Model.Entities;

public class User : IdentityUser, IDataBaseEntity<User>
{
    public Roles Role { get; set; }
    public List<Adress> Adresses { get; set; } = new();
    
    public User() : base(){}
    
    public User(
        string username,
        string email,
        string? phoneNumber = null,
        Roles role = Roles.User
    ) : base()
    {
        UserName = username;
        NormalizedUserName = username.ToUpper();
        Email = email;
        NormalizedEmail = email.ToUpper();
        PhoneNumber = phoneNumber;
        PhoneNumberConfirmed = phoneNumber != null;
        Role = role;
    }
    
    public bool Equals(User? other)
    {
        return other is not null && (Id == other.Id || NormalizedEmail == other.NormalizedEmail);
    }

    public void Update(User? entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));
        UserName = entity.UserName ?? UserName;
        NormalizedUserName = entity.NormalizedUserName ?? entity.UserName?.ToUpper() ?? NormalizedUserName;
        Email = entity.Email ?? Email;
        NormalizedEmail = entity.NormalizedEmail ?? entity.Email?.ToUpper() ?? NormalizedEmail;
        PhoneNumber = entity.PhoneNumber ?? PhoneNumber;
        PhoneNumberConfirmed = entity.PhoneNumberConfirmed || PhoneNumberConfirmed;
    }
    
    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }

    public bool HardEquals(User? other)
    {
        return !CheckNullOrWrongType(other) && Id == other!.Id && NormalizedEmail == other.NormalizedEmail && UserName == other.UserName && Role == other.Role && PhoneNumber == other.PhoneNumber;
    }
}