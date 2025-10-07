namespace Mobile_back_end.Model.Commands.User;

public class LoginUser
{
    public string? UserName { get; set; }
    public string Password { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
}