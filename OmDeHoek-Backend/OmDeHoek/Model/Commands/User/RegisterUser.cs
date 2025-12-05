namespace OmDeHoek.Model.Commands.User;

public class RegisterUser
{
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Password { get; set; }
    public DateOnly BirthDate { get; set; }
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
}