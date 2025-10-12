using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class DeelGemeenteDto
{
    public string Nis6Code { get; set; } = string.Empty;
    public string Naam { get; set; } = string.Empty;
    
    public GemeenteDto? Gemeente { get; set; }
    
    public List<BuurtDto> Buurten { get; set; } = new();
    
    public DeelGemeenteDto() 
    {
    }
    public DeelGemeenteDto(DeelGemeente deelGemeente, Talen taal, bool negeerGemeente = false, bool negeerBuurten = false)
    {
        Naam = taal switch
        {
            Talen.Nl => deelGemeente.NaamNl,
            Talen.Fr => deelGemeente.NaamFr,
            _ => deelGemeente.NaamNl
        };
        
        Nis6Code = deelGemeente.Nis6Code;
        
        // Loop protection: Indien de gemeente dit DeelGemeenteDto aanmaakt, mag deze geen GemeenteDto meer aanmaken
        if (!negeerGemeente && deelGemeente.Gemeente != null)
        {
            Gemeente = new GemeenteDto(deelGemeente.Gemeente, taal);
        }
        // Loop protection: Indien de buurt dit DeelGemeenteDto aanmaakt, mag deze geen BuurtDto's meer aanmaken
        if(!negeerBuurten)
        {
            Buurten = deelGemeente.Buurten.Select(b => new BuurtDto(b, taal, negeerDeelgemeente: true)).ToList();
        }
    }
}