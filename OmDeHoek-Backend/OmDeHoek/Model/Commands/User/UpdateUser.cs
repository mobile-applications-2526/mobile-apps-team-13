using OmDeHoek.Model.Exceptions;
// ReSharper disable InvertIf

namespace OmDeHoek.Model.Commands.User;

public class UpdateUser
{
    #nullable enable
    public string? Username { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Voornaam { get; set; }
    public string? Achternaam { get; set; }

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

        if (Email is not null)
        {
            Email = Email.Trim();
            if (!Utils.AuthUtils.IsValidEmail(Email))
                throw new InvalidInputException("Email is van ongeldig formaat", "email");
            // valid email
        }

        if (Voornaam is not null)
        {
            Voornaam = Voornaam.Trim();
            if(string.IsNullOrWhiteSpace(Voornaam)) 
                throw new InvalidInputException("Voornaam mag niet leeg zijn",  "Voornaam");
        }

        if (Achternaam is not null)
        {
            Achternaam = Achternaam.Trim();
            if (string.IsNullOrWhiteSpace(Achternaam))
                throw new InvalidInputException("Acthernaam mag niet leeg zijn", "Achternaam");
        }
    }
}