using OmDeHoek.Model.DTO.User;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class NeighborhoodDto
{
    public NeighborhoodDto()
    {
    }

    public NeighborhoodDto(Buurt buurt, Talen taal = Talen.En, bool negeerDeelgemeente = false)
    {
        Name = taal switch
        {
            Talen.Nl => buurt.NaamNl,
            Talen.Fr => buurt.NaamFr,
            Talen.De => buurt.NaamDe ?? buurt.NaamNl,
            _ => buurt.NaamNl
        };
        StatischeSectorCode = buurt.StatistischeSectorCode;

        // Loop protection: DeelgemeenteDto enkel maken als de BuurtDto niet al deel uitmaakt van een DeelgemeenteDto
        if (!negeerDeelgemeente && buurt.DeelGemeente != null)
            Borough = new DeelGemeenteDto(buurt.DeelGemeente, taal, negeerBuurten: true);

        Residents = buurt.Bewoners.Select(ub => new PrivacyUserDto(ub.User!)).ToList();
    }

    public DeelGemeenteDto? Borough { get; set; }
    public string Name { get; set; } = string.Empty;
    public string StatischeSectorCode { get; set; } = string.Empty;
    public List<PrivacyUserDto> Residents { get; set; } = [];
}