namespace Mobile_back_end.Model.Entities;

public class Adress: IDataBaseEntity<Adress>
{
    public Guid Id { get; private set; }
    public string Straat { get; set; }
    public string? Huisnummer { get; set; }
    public string? Postcode { get; set; }
    public string? Dorp { get; set; }
    
    public string FullAdress => $"{Straat} {Huisnummer}, {Postcode} {Dorp}";
    
    public string BewonerId { get; set; }
    public User Bewoner { get; set; }
    
    public bool Equals(Adress? other)
    {
        return other is not null && Id == other.Id;
    }
    
    public void Update(Adress? entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));
        Straat = entity.Straat ?? Straat;
        Huisnummer = entity.Huisnummer ?? Huisnummer;
        Postcode = entity.Postcode ?? Postcode;
        Dorp = entity.Dorp ?? Dorp;
    }
    
    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }

    public bool HardEquals(Adress? other)
    {
        return !CheckNullOrWrongType(other) && Straat == other.Straat && Huisnummer == other.Huisnummer && Postcode == other.Postcode && Dorp == other.Dorp && BewonerId == other.BewonerId;
    }
}