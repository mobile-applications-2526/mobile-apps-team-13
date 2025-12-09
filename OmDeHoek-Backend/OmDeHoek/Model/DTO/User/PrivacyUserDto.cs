namespace OmDeHoek.Model.DTO.User;

public class PrivacyUserDto
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Voornaam { get; set; } =  string.Empty;
    public string Achternaam { get; set; } = string.Empty;

    public PrivacyUserDto() { }

    public PrivacyUserDto(string id, string username)
    {
        Id = id;
        Username = username;
    }

    public PrivacyUserDto(Entities.User user)
    {
        Id = user.Id;
        Username = user.UserName ?? "onbekend";
        Voornaam = user.Voornaam;
        Achternaam = user.Achternaam;
    }
}