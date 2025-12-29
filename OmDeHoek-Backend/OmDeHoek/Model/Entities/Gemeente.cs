using System.ComponentModel.DataAnnotations;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.Entities;

public class Gemeente : IDataBaseEntity<Gemeente>
{
    [MaxLength(5), Key]
    public string NisCode { get; set; } = string.Empty; // Primary key
    [MaxLength(255)]
    public string NaamNl { get; set; } = string.Empty;
    [MaxLength(255)]
    public string NaamFr { get; set; } = string.Empty;
    [MaxLength(255)]
    public string? NaamDe { get; set; } = null;

    [MaxLength(3)]
    public string GesprokenTalen { get; set; } = "N"; // Default Nederlands
    public List<DeelGemeente> DeelGemeentes { get; set; } = [];
    public List<Postcode> Postcodes { get; set; } = [];

    public Gemeente() { }

    public bool Equals(Gemeente? other)
    {
        return !CheckNullOrWrongType(other)
               && NisCode == other!.NisCode;
    }

    public void Update(Gemeente? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same", nameof(entity));
        NaamFr = entity?.NaamFr ?? NaamFr;
        NaamNl = entity?.NaamNl ?? NaamNl;
        GesprokenTalen = entity?.GesprokenTalen ?? GesprokenTalen;
        NaamDe = entity?.NaamDe ?? NaamDe;
    }

    public bool HardEquals(Gemeente? other)
    {
        return Equals(other)
               && NaamFr == other!.NaamFr
               && NaamNl == other.NaamNl
               && GesprokenTalen == other.GesprokenTalen
               && NaamDe == other.NaamDe;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }

    public string GetNameInCorrectLanguage(Languages taal)
    {
        var defaultNaam = GesprokenTalen.ToCharArray()[0] switch
        {
            'F' => NaamFr,
            'D' => NaamDe,
            _ => NaamNl
        };

        var naam = taal switch
        {
            Enums.Languages.Nl => NaamNl,
            Enums.Languages.Fr => NaamFr,
            Enums.Languages.De => NaamDe ?? NaamNl,
            _ => defaultNaam ?? NaamNl
        };

        return naam;
    }

    public bool Equals(Gemeente? x, Gemeente? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(Gemeente obj)
    {
        return HashCode.Combine(NisCode);
    }
}