namespace Mobile_back_end.Model.Commands.User;

public class RegisterUser
{
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
}