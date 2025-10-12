using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class GemeenteDto
{
    public string NisCode { get; set; } = string.Empty;
    public string Naam { get; set; } = string.Empty;
    public string Talen { get; set; } = string.Empty;
    public List<DeelGemeenteDto> DeelGemeenten { get; set; } = [];
    public List<string> Postcodes { get; set; } = [];
    
    public GemeenteDto() { }
    
    public GemeenteDto(Gemeente gemeente, Talen taal = Enums.Talen.En, bool negeerDeelGemeenten = false)
    {
        NisCode = gemeente.NisCode;
        Postcodes = gemeente.Postcodes.Select(p => p.Code).ToList();
        
        var talenChars = gemeente.GesprokenTalen.Trim().ToCharArray();
        var talenVoluit = talenChars.Select(c => c switch
        {
            'N' => "Nederlands",
            'F' => "Frans",
            'D' => "Duits",
            _ => "Nederlands"
        }).ToList();
        Talen = string.Join(", ", talenVoluit);
        var defaultNaam = talenChars[0] switch
        {
            'F' => gemeente.NaamFr,
            'D' => gemeente.NaamDe,
            _ => gemeente.NaamNl
        };
        
        var naam = taal switch
        {
            Enums.Talen.Nl => gemeente.NaamNl,
            Enums.Talen.Fr => gemeente.NaamFr,
            Enums.Talen.De => gemeente.NaamDe ?? gemeente.NaamNl,
            _ => defaultNaam ?? gemeente.NaamNl
        };
        
        Naam = naam;
        
        // loop protection: DeelgemeenteDto enkel vullen wanneer nodig en dit object geen deel is van een DeelGemeenteDto
        if (!negeerDeelGemeenten)
        {
            DeelGemeenten = gemeente.DeelGemeentes
                .Select(dg => new DeelGemeenteDto(dg, taal, negeerGemeente: true))
                .OrderBy(dg => dg.Naam)
                .ToList();
        }
    }
}