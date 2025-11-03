using System.ComponentModel.DataAnnotations;

namespace OmDeHoek.Model.Entities;

public class Gemeente : IDataBaseEntity<Gemeente>
{
    [MaxLength(5)]
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
               && NisCode == other.NisCode;
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
               && NaamFr == other.NaamFr
               && NaamNl == other.NaamNl
               && GesprokenTalen == other.GesprokenTalen
               && NaamDe == other.NaamDe;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}