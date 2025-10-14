namespace OmDeHoek.Model.Commands.Adressen;

public class InsertAdres
{
    public string Straat { get; set; } = string.Empty;
    public string? Huisnummer { get; set; }
    public string Postcode { get; set; } = string.Empty;
    public string BewonerId { get; set; } = string.Empty;
}