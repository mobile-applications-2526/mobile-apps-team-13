namespace OmDeHoek.Model.Entities;

public class Postcode : IDataBaseEntity<Postcode>
{
    public string Code { get; set; }
    public Gemeente Gemeente { get; set; }
    public string NisCodeGemeente { get; set; }
    
    public Postcode() {}
    
    public bool Equals(Postcode? other)
    {
        return !CheckNullOrWrongType(other) 
               && Code == other.Code;
    }

    public void Update(Postcode? entity)
    {
        if(!Equals(entity)) throw new ArgumentException("Entities are not the same", nameof(entity));
        NisCodeGemeente = entity.NisCodeGemeente;
    }

    public bool HardEquals(Postcode? other)
    {
        return Equals(other)
               && NisCodeGemeente == other.NisCodeGemeente;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}