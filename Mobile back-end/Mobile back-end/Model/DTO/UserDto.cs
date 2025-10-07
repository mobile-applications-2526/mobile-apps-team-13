using Mobile_back_end.Model.Entities;

namespace Mobile_back_end.Model.DTO;

public class UserDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; }
    public List<Adress> Adresses { get; set; } = new();
    
    public UserDto() { }
    
    public UserDto(User user)
    {
        Id = user.Id;
        UserName = user.UserName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        Role = user.Role.ToString();
        Adresses = user.Adresses;
    }
    
}