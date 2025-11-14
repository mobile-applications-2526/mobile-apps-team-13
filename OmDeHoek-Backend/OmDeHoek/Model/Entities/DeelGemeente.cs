using System.ComponentModel.DataAnnotations;

namespace OmDeHoek.Model.Entities;

public class DeelGemeente : IDataBaseEntity<DeelGemeente>
{
    public Gemeente? Gemeente { get; set; }
    [MaxLength(5)]
    public string NisCodeGemeente { get; set; } = string.Empty; // Foreign key 

    [MaxLength(6)]
    public string Nis6Code { get; set; } = string.Empty; // Primary key
    [MaxLength(255)]
    public string NaamNl { get; set; } = string.Empty;
    [MaxLength(255)]
    public string NaamFr { get; set; } = string.Empty;
    public List<Buurt> Buurten { get; init; } = [];

    public DeelGemeente() { }

    public bool Equals(DeelGemeente? other)
    {
        return !CheckNullOrWrongType(other) && Nis6Code == other.Nis6Code;
    }

    public void Update(DeelGemeente? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same");
        NaamNl = entity.NaamNl ?? NaamNl;
        NaamFr = entity.NaamFr ?? NaamFr;
        NisCodeGemeente = entity.NisCodeGemeente ?? NisCodeGemeente;
        Gemeente = entity.Gemeente ?? Gemeente;
    }

    public bool HardEquals(DeelGemeente? other)
    {
        return Equals(other)
               && NaamNl == other.NaamNl
               && NaamFr == other.NaamFr
               && NisCodeGemeente == other.NisCodeGemeente;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }

    public bool Equals(DeelGemeente? x, DeelGemeente? y)
    {
        return x is not null && x.Equals(y);
    }

    public int GetHashCode(DeelGemeente obj)
    {
        return HashCode.Combine(obj.Nis6Code);
    }
}