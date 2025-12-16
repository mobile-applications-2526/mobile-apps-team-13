using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO.User;

public class UserDto
{
    public UserDto()
    {
    }

    public UserDto(Entities.User user, Talen taal = Talen.En)
    {
        Id = user.Id;
        UserName = user.UserName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        Role = user.Role.ToString();
        Addresses = user.Adressen.Select(a => new AdresDto(a)).ToList();
        BirthDate = user.BirthDate;
        Neighborhoods = user.Buurten.Select(ub => new BuurtDto(ub.Buurt, taal, false)).ToList();
        FirstName = user.Voornaam;
        LastName = user.Achternaam;
    }

    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; }
    public DateOnly BirthDate { get; set; }
    public List<AdresDto> Addresses { get; set; } = [];
    public List<BuurtDto> Neighborhoods { get; set; } = [];
    public string FirstName { get; set; }
    public string LastName { get; set; }
}