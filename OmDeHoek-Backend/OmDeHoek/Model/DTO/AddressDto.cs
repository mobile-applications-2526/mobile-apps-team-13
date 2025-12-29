using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.DTO;

public class AddressDto
{
    public AddressDto()
    {
    }

    public AddressDto(Adres adres)
    {
        AdresId = adres.Id;
        Street = adres.Straat;
        HouseNumber = adres.Huisnummer;
        PostalCode = adres.Postcode;
        VillageName = adres.Dorp;
        FullAdress = adres.FullAdress;
    }

    public Guid AdresId { get; init; }
    public string Street { get; init; } = string.Empty;
    public string? HouseNumber { get; init; }
    public string PostalCode { get; init; } = string.Empty;
    public string VillageName { get; init; } = string.Empty;
    public string FullAdress { get; init; } = string.Empty;
}