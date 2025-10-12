namespace OmDeHoek.Model.Entities;

public class Adres: IDataBaseEntity<Adres>
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Straat { get; set; }
    public string? Huisnummer { get; set; }
    public string Postcode { get; set; }
    public string Dorp { get; set; }
    
    public string FullAdress => $"{Straat} {Huisnummer}, {Postcode} {Dorp}";
    
    public string BewonerId { get; set; }
    public User Bewoner { get; set; }
    
    public bool Equals(Adres? other)
    {
        if (CheckNullOrWrongType(other)) return false;
        return Id == other!.Id;
    }
    
    public void Update(Adres? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("De adressen moeten hetzelfde Id hebben");
        Straat = entity.Straat ?? Straat;
        Huisnummer = entity.Huisnummer ?? Huisnummer;
        Postcode = entity.Postcode ?? Postcode;
        Dorp = entity.Dorp ?? Dorp;
    }
    
    public bool CheckNullOrWrongType(object? other)
    {
        if (other is null) return true;
        return GetType() != other.GetType();
    }

    public bool HardEquals(Adres? other)
    {
        return Equals(other) && Straat == other!.Straat && Huisnummer == other.Huisnummer && Postcode == other.Postcode && Dorp == other.Dorp && BewonerId == other.BewonerId;
    }
}