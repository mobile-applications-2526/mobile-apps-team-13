using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO;

public class PrivacyUserDto
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;

    public PrivacyUserDto() { }

    public PrivacyUserDto(string id, string username)
    {
        Id = id;
        Username = username;
    }

    public PrivacyUserDto(User user)
    {
        Id = user.Id;
        Username = user.UserName;
    }
}