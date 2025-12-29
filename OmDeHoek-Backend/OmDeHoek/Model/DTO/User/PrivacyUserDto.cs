namespace OmDeHoek.Model.DTO.User;

public class PrivacyUserDto
{
    public PrivacyUserDto()
    {
    }

    public PrivacyUserDto(string id, string username)
    {
        Id = id;
        Username = username;
    }

    public PrivacyUserDto(Entities.User user)
    {
        Id = user.Id;
        Username = user.UserName ?? "onbekend";
        FirstName = user.Voornaam;
        LastName = user.Achternaam;
    }

    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}