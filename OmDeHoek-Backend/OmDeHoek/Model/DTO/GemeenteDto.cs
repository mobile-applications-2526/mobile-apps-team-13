using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class GemeenteDto
{
    public GemeenteDto()
    {
    }

    public GemeenteDto(Gemeente gemeente, Talen taal = Talen.En, bool negeerDeelGemeenten = false)
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
            Talen.Nl => gemeente.NaamNl,
            Talen.Fr => gemeente.NaamFr,
            Talen.De => gemeente.NaamDe ?? gemeente.NaamNl,
            _ => defaultNaam ?? gemeente.NaamNl
        };

        Name = naam;

        // loop protection: DeelgemeenteDto enkel vullen wanneer nodig en dit object geen deel is van een DeelGemeenteDto
        if (!negeerDeelGemeenten)
            Boroughs = gemeente.DeelGemeentes
                .Select(dg => new DeelGemeenteDto(dg, taal, true))
                .OrderBy(dg => dg.Name)
                .ToList();
    }

    public string NisCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Languages { get; set; } = string.Empty;
    public List<DeelGemeenteDto> Boroughs { get; set; } = [];
    public List<string> PostalCodes { get; set; } = [];
}