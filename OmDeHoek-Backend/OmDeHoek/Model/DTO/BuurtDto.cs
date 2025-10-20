using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class BuurtDto
{
    public DeelGemeenteDto? DeelGemeente { get; set; }
    public string Naam { get; set; } = string.Empty;
    public string StatischeSectorCode { get; set; } = string.Empty;
    public List<PrivacyUserDto> Bewoners { get; set; } = [];
    
    public BuurtDto() {}

    public BuurtDto(Buurt buurt, Talen taal = Talen.En, bool negeerDeelgemeente = false)
    {
        Naam = taal switch
        {
            Talen.Nl => buurt.NaamNl,
            Talen.Fr => buurt.NaamFr,
            Talen.De => buurt.NaamDe ?? buurt.NaamNl,
            _ => buurt.NaamNl
        };
        StatischeSectorCode = buurt.StatistischeSectorCode;
        
        // Loop protection: DeelgemeenteDto enkel maken als de BuurtDto niet al deel uitmaakt van een DeelgemeenteDto
        if(!negeerDeelgemeente && buurt.DeelGemeente != null)
        {
            DeelGemeente = new DeelGemeenteDto(buurt.DeelGemeente, taal, negeerBuurten: true);
        }
        
        Bewoners = buurt.Bewoners.Select(ub => new PrivacyUserDto(ub.User!)).ToList();
    }
}