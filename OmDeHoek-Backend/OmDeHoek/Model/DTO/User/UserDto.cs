using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO;

public class UserDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; }
    public DateOnly BirthDate { get; set; }
    public List<Adres> Adressen { get; set; } = [];
    
    public UserDto() { }
    
    public UserDto(User user)
    {
        Id = user.Id;
        UserName = user.UserName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        Role = user.Role.ToString();
        Adressen = user.Adressen;
        BirthDate = user.BirthDate;
    }
    
}