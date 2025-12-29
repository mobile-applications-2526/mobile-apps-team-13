namespace OmDeHoek.Model.Commands.Adressen;

public class InsertAddress
{
    public string Street { get; set; } = string.Empty;
    public string? HouseNumber { get; set; }
    public string PostalCode { get; set; } = string.Empty;
}