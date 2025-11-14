using System.ComponentModel.DataAnnotations;

namespace OmDeHoek.Model.Commands.auth;

public class RefreshTokenCommand
{
    [Required]
    public string RefreshToken { get; set; }
}