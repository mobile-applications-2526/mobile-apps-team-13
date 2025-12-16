namespace OmDeHoek.Model.Commands.Adressen;

public class InsertAdres
{
    public string Street { get; set; } = string.Empty;
    public string? HouseNumber { get; set; }
    public string PostalCode { get; set; } = string.Empty;
    public string ResidentId { get; set; } = string.Empty;
}