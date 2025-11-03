using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class UserDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; }
    public DateOnly BirthDate { get; set; }
    public List<AdresDto> Adressen { get; set; } = [];
    public List<BuurtDto> Buurten { get; set; } = [];

    public UserDto() { }

    public UserDto(User user, Talen taal = Talen.En)
    {
        Id = user.Id;
        UserName = user.UserName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        Role = user.Role.ToString();
        Adressen = user.Adressen.Select(a => new AdresDto(a)).ToList();
        BirthDate = user.BirthDate;
        Buurten = user.Buurten.Select(ub => new BuurtDto(ub.Buurt, taal, negeerDeelgemeente: false)).ToList();
    }

}