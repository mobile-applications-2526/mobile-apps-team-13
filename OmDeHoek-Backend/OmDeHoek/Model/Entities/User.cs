using Microsoft.AspNetCore.Identity;
using OmDeHoek.Model.Commands.User;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Model.Entities;

public class User : IdentityUser, IDataBaseEntity<User>
{
    public Roles Role { get; set; }
    public DateOnly BirthDate { get; set; }
    public List<Adres> Adressen { get; set; } = [];
    public List<UserBuurt> Buurten { get; set; } = [];

    public User() : base() { }

    public User(
        string username,
        string email,
        DateOnly birthDate,
        string? phoneNumber = null,
        Roles role = Roles.User
    ) : base()
    {
        BirthDate = birthDate;
        UserName = username;
        NormalizedUserName = username.ToUpper();
        Email = email;
        NormalizedEmail = email.ToUpper();
        PhoneNumber = phoneNumber;
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

    public bool Equals(User? x, User? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(User obj)
    {
        return HashCode.Combine(Id, NormalizedEmail);
    }
}