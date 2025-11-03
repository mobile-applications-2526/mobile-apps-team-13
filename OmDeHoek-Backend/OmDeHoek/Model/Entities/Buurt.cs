using System.ComponentModel.DataAnnotations;

namespace OmDeHoek.Model.Entities;

public class Buurt : IDataBaseEntity<Buurt>
{

    public DeelGemeente? DeelGemeente { get; init; }
    [MaxLength(6)]
    public string Nis6DeelGemeente { get; set; } = string.Empty;

    [MaxLength(255)]
    public string NaamNl { get; set; } = string.Empty;
    [MaxLength(255)]
    public string NaamFr { get; set; } = string.Empty;
    [MaxLength(255)]
    public string? NaamDe { get; set; } = string.Empty;

    [MaxLength(9)]
    public string StatistischeSectorCode { get; set; } = string.Empty;

    public List<UserBuurt> Bewoners { get; init; } = [];
    
    public List<Message> Messages { get; init; } = [];

    public Buurt() { }

    public bool Equals(Buurt? other)
    {
        return !CheckNullOrWrongType(other)
               && StatistischeSectorCode == other!.StatistischeSectorCode;
    }

    public void Update(Buurt? entity)
    {
        if (!Equals(entity)) throw new ArgumentException("Entities are not the same");
        NaamFr = entity?.NaamFr ?? NaamFr;
        NaamDe = entity?.NaamDe ?? NaamDe;
        NaamNl = entity?.NaamNl ?? NaamNl;
        Nis6DeelGemeente = entity?.Nis6DeelGemeente ?? Nis6DeelGemeente;
    }

    public bool HardEquals(Buurt? other)
    {
        return Equals(other)
               && NaamFr == other!.NaamFr
               && NaamDe == other.NaamDe
               && NaamNl == other.NaamNl
               && Nis6DeelGemeente == other.Nis6DeelGemeente;
    }

    public bool CheckNullOrWrongType(object? other)
    {
        return other is null || GetType() != other.GetType();
    }
}