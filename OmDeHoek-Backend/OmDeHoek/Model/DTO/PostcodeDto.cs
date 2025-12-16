using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.DTO;

public class PostcodeDto
{
    public PostcodeDto()
    {
    }

    public PostcodeDto(Postcode postcode, Talen taal)
    {
        Code = postcode.Code;
        Municipality = postcode.Gemeente != null ? postcode.Gemeente.GetNameInCorrectLanguage(taal) : string.Empty;
        NisCode = postcode.NisCodeGemeente;
    }

    public string Code { get; set; } = string.Empty;
    public string Municipality { get; set; }
    public string NisCode { get; set; } = string.Empty;
}