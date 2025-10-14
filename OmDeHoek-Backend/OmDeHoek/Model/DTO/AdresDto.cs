using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO;

public class AdresDto
{
    public Guid AdresId { get; init; }
    public string Straat { get; init; } = string.Empty;
    public string? Huisnummer { get; init; }
    public string Postcode { get; init; } = string.Empty;
    public string BewonerId { get; init; } = string.Empty;
    public string Dorp { get; init; } = string.Empty;
    
    public AdresDto(){}

    public AdresDto(Adres adres)
    {
        AdresId = adres.Id;
        Straat = adres.Straat;
        Huisnummer = adres.Huisnummer;
        Postcode = adres.Postcode;
        Dorp = adres.Dorp;
        BewonerId = adres.BewonerId;
    }
}