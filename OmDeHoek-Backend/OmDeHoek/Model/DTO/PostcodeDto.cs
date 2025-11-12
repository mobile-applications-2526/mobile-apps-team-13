using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class PostcodeDto
{
    public string Code { get; set; } = string.Empty;
    public string Gemeente { get; set; }
    public string nisCode { get; set; } = string.Empty;
    
    public PostcodeDto()
    {
    }
    
    public PostcodeDto(Entities.Postcode postcode, Talen taal)
    {
        Code = postcode.Code;
        Gemeente = postcode.Gemeente != null ? postcode.Gemeente.GetNameInCorrectLanguage(taal) : string.Empty;
        nisCode = postcode.NisCodeGemeente;
    }
}