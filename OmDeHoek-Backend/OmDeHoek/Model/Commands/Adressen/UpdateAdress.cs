namespace OmDeHoek.Model.Commands.Adressen;

public record UpdateAdress(Guid AdresId, String? Street = null, String? HouseNumber = null, String? PostalCode = null, String? VillageName = null);
