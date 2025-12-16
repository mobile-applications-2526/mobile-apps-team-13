using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class DeelGemeenteDto
{
    public DeelGemeenteDto()
    {
    }

    public DeelGemeenteDto(DeelGemeente deelGemeente, Talen taal, bool negeerGemeente = false,
        bool negeerBuurten = false)
    {
        Name = taal switch
        {
            Talen.Nl => deelGemeente.NaamNl,
            Talen.Fr => deelGemeente.NaamFr,
            _ => deelGemeente.NaamNl
        };

        Nis6Code = deelGemeente.Nis6Code;

        // Loop protection: Indien de gemeente dit DeelGemeenteDto aanmaakt, mag deze geen GemeenteDto meer aanmaken
        if (!negeerGemeente && deelGemeente.Gemeente != null)
            Municipality = new GemeenteDto(deelGemeente.Gemeente, taal, true);
        // Loop protection: Indien de buurt dit DeelGemeenteDto aanmaakt, mag deze geen BuurtDto's meer aanmaken
        if (!negeerBuurten) Neighborhoods = deelGemeente.Buurten.Select(b => new BuurtDto(b, taal, true)).ToList();
    }

    public string Nis6Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public GemeenteDto? Municipality { get; set; }

    public List<BuurtDto> Neighborhoods { get; set; } = [];
}