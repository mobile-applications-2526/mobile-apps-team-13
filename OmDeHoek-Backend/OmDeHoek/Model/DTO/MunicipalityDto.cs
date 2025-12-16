using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class MunicipalityDto
{
    public MunicipalityDto()
    {
    }

    public MunicipalityDto(Gemeente gemeente, Languages taal = Enums.Languages.En, bool negeerDeelGemeenten = false)
    {
        NisCode = gemeente.NisCode;
        PostalCodes = gemeente.Postcodes.Select(p => p.Code).ToList();

        var talenChars = gemeente.GesprokenTalen.Trim().ToCharArray();
        var talenVoluit = talenChars.Select(c => c switch
        {
            'N' => "Nederlands",
            'F' => "Frans",
            'D' => "Duits",
            _ => "Nederlands"
        }).ToList();
        Languages = string.Join(", ", talenVoluit);
        var defaultNaam = talenChars[0] switch
        {
            'F' => gemeente.NaamFr,
            'D' => gemeente.NaamDe,
            _ => gemeente.NaamNl
        };

        var naam = taal switch
        {
            Enums.Languages.Nl => gemeente.NaamNl,
            Enums.Languages.Fr => gemeente.NaamFr,
            Enums.Languages.De => gemeente.NaamDe ?? gemeente.NaamNl,
            _ => defaultNaam ?? gemeente.NaamNl
        };

        Name = naam;

        // loop protection: DeelgemeenteDto enkel vullen wanneer nodig en dit object geen deel is van een DeelGemeenteDto
        if (!negeerDeelGemeenten)
            Boroughs = gemeente.DeelGemeentes
                .Select(dg => new BoroughDto(dg, taal, true))
                .OrderBy(dg => dg.Name)
                .ToList();
    }

    public string NisCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Languages { get; set; } = string.Empty;
    public List<BoroughDto> Boroughs { get; set; } = [];
    public List<string> PostalCodes { get; set; } = [];
}