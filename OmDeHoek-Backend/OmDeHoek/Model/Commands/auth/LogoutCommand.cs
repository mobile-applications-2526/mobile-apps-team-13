namespace OmDeHoek.Model.Commands.auth;

public class LogoutCommand
{
    public string RefreshToken { get; set; } = string.Empty;
}