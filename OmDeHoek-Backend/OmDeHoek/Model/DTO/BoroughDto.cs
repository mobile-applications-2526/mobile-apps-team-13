using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class BoroughDto
{
    public BoroughDto()
    {
    }

    public BoroughDto(DeelGemeente deelGemeente, Languages taal, bool negeerGemeente = false,
        bool negeerBuurten = false)
    {
        Name = taal switch
        {
            Languages.Nl => deelGemeente.NaamNl,
            Languages.Fr => deelGemeente.NaamFr,
            _ => deelGemeente.NaamNl
        };

        Nis6Code = deelGemeente.Nis6Code;

        // Loop protection: Indien de gemeente dit DeelGemeenteDto aanmaakt, mag deze geen GemeenteDto meer aanmaken
        if (!negeerGemeente && deelGemeente.Gemeente != null)
            Municipality = new MunicipalityDto(deelGemeente.Gemeente, taal, true);
        // Loop protection: Indien de buurt dit DeelGemeenteDto aanmaakt, mag deze geen BuurtDto's meer aanmaken
        if (!negeerBuurten) Neighborhoods = deelGemeente.Buurten.Select(b => new NeighborhoodDto(b, taal, true)).ToList();
    }

    public string Nis6Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public MunicipalityDto? Municipality { get; set; }

    public List<NeighborhoodDto> Neighborhoods { get; set; } = [];
}