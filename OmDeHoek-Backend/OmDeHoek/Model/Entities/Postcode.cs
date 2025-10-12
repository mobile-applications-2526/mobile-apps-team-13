using System.ComponentModel.DataAnnotations;

namespace OmDeHoek.Model.Entities;

public class Postcode : IDataBaseEntity<Postcode>
{
    [MaxLength(4)]
    public string Code { get; set; } = string.Empty; // Primary key
    public Gemeente? Gemeente { get; init; }
    [MaxLength(5)]
    public string NisCodeGemeente { get; set; } = string.Empty; // Foreign key, part of primary key
    
    public Postcode() {}
    
    public bool Equals(Postcode? other)
    {
        return !CheckNullOrWrongType(other) 
               && Code == other?.Code;
    }

    public void Update(Postcode? entity)
    {
        if(!Equals(entity)) throw new ArgumentException("Entities are not the same", nameof(entity));
        NisCodeGemeente = entity!.NisCodeGemeente;
    }

    public bool HardEquals(Postcode? other)
    {
        return Equals(other)
               && NisCodeGemeente == other?.NisCodeGemeente;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}