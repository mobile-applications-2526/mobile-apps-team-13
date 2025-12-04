using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Model.Commands.User;

public class UpdateUser
{
    #nullable enable
    public string? Username { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

    /// <summary>
    /// Throws wanneer een inputwaarde niet voldoet aan de validatieregels
    /// </summary>
    /// <exception cref="InvalidInputException"></exception>
    public void Validate()
    {
        if (Username is not null)
        {
            if(string.IsNullOrWhiteSpace(Username)) throw new InvalidInputException("Username mag niet leeg zijn", "Username");
            Username = Username.Trim();
            if(Username.Length < 3 || Username.Length > 31) throw new InvalidInputException("Username moet tussen 3 en 31 karakters zijn", "Username");
            // valid username
        }

        if (PhoneNumber is not null)
        {
            //heeft nog geen validatieregels
        }

        // ReSharper disable once InvertIf
        if (Email is not null)
        {
            Email = Email.Trim();
            if (!Utils.AuthUtils.IsValidEmail(Email))
                throw new InvalidInputException("Email is van ongeldig formaat", "email");
            // valid email
        }
    }
}