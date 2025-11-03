namespace OmDeHoek.Model.Entities;

public interface IDataBaseEntity<in T>
{
    /// <summary>
    /// Kijkt na of de twee objecten gelijk zijn op basis van hun unieke eigenschappen. (bijv. Id)
    /// </summary>
    /// <param name="other">Het object waarmee vergeleken wordt</param>
    /// <returns>True als de 2 objecten dezelfde primary key hebben, anders false.</returns>
    public bool Equals(T? other);

    /// <summary>
    /// Verandert de properties van het object met de properties van het meegegeven object indien deze niet null zijn.
    /// Werkt alleen wanneer de twee objecten gelijk zijn volgens de Equals methode.
    /// </summary>
    /// <param name="entity">Het object met de vervangwaarden</param>
    public void Update(T? entity);

    /// <summary>
    /// Kijkt of alle properties gelijk zijn tussen de twee objecten
    /// </summary>
    /// <param name="other">Het andere object</param>
    /// <returns>true wanneer alle properties gelijk zijn. Anders false</returns>
    public bool HardEquals(T? other);

    /// <summary>
    /// Kijkt of het object null is of van een ander type
    /// </summary>
    /// <param name="other">Een ander object</param>
    /// <returns>
    /// True als het object null is of van een ander type, anders false
    /// </returns>
    public bool CheckNullOrWrongType(object? other);
}