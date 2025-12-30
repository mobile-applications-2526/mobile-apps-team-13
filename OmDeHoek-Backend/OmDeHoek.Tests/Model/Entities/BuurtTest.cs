namespace OmDeHoek.Tests.Model.Entities;

public class BuurtTest
{
    private readonly string _validSectorCode = "200320A00-";
    private readonly string _validNis6Code = "200320A";
    private readonly string _validNaamNl = "Centrum";
    private readonly string _validNaamFr = "Centre-ville";
    private readonly string _validNaamDe = "Zentrum";

    [Fact]
    public void Constructor_ShouldCreateBuurt()
    {
        // Arrange

        // Act
        var buurt = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Assert
        Assert.NotNull(buurt);
        Assert.Equal(_validSectorCode, buurt.StatistischeSectorCode);
        Assert.Equal(_validNis6Code, buurt.Nis6DeelGemeente);
        Assert.Equal(_validNaamNl, buurt.NaamNl);
        Assert.Equal(_validNaamFr, buurt.NaamFr);
        Assert.Equal(_validNaamDe, buurt.NaamDe);
    }
    
    [Fact]
    public void Equals_ShouldReturnTrue_ForSameBuurt()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Act
        var result = buurt1.Equals(buurt2);
        
        // Assert
        Assert.True(result);
    }
    
    [Fact]
    public void Equals_ShouldReturnTrue_ForBuurtWithSameSectorCode()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = "200320B",
            NaamNl = "Andere Buurt",
            NaamFr = "Autre Quartier",
            NaamDe = "Anderer Stadtteil"
        };
        
        // Act
        var result = buurt1.Equals(buurt2);
        
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForDifferentSectorCode()
    {
        // Arrange
        var buurt1 = new Buurt()
        {            
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = "200320B00-",
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Act
        var result = buurt1.Equals(buurt2);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForNull()
    {
        // Arrange
        var buurt = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        // Act
        var result = buurt.Equals(null);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForDifferentType()
    {
        // Arrange
        var buurt = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        var differentTypeObject = new { SomeProperty = "SomeValue" };
        
        // Act
        var result = buurt.Equals(differentTypeObject);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void GetHashCode_ShouldReturnSameHashCode_ForSameBuurt()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Act
        var hashCode1 = buurt1.GetHashCode();
        var hashCode2 = buurt1.GetHashCode();
        
        // Assert
        Assert.Equal(hashCode1, hashCode2);
    }

    [Fact]
    public void GetHashCode_ShouldReturnDifferentHashCode_ForDifferentSectorCode()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = "200320B00-",
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Act
        var hashCode1 = buurt1.GetHashCode();
        var hashCode2 = buurt2.GetHashCode();
        
        // Assert
        Assert.NotEqual(hashCode1, hashCode2);
    }
    
    [Fact]
    public void Update_ShouldUpdateProperties_ForSameBuurt()
    {
        // Arrange
        var originalBuurt = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var updatedBuurt = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = "200320B",
            NaamNl = "Nieuwe Naam NL",
            NaamFr = "Nouveau Nom FR",
            NaamDe = "Neuer Name DE"
        };
        
        // Act
        originalBuurt.Update(updatedBuurt);
        
        // Assert
        Assert.Equal("200320B", originalBuurt.Nis6DeelGemeente);
        Assert.Equal("Nieuwe Naam NL", originalBuurt.NaamNl);
        Assert.Equal("Nouveau Nom FR", originalBuurt.NaamFr);
        Assert.Equal("Neuer Name DE", originalBuurt.NaamDe);
    }
    
    [Fact]
    public void Update_ShouldThrowArgumentException_ForDifferentBuurt()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = "200320B00-",
            Nis6DeelGemeente = "200320B",
            NaamNl = "Andere Buurt",
            NaamFr = "Autre Quartier",
            NaamDe = "Anderer Stadtteil"
        };
        
        // Act & Assert
        Assert.Throws<ArgumentException>(() => buurt1.Update(buurt2));
        Assert.Equal(_validNis6Code, buurt1.Nis6DeelGemeente);
        Assert.Equal(_validNaamNl, buurt1.NaamNl);
        Assert.Equal(_validNaamFr, buurt1.NaamFr);
        Assert.Equal(_validNaamDe, buurt1.NaamDe);
    }

    [Fact]
    public void HardEquals_ShouldReturnTrue_ForIdenticalBuurt()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        
        // Act
        var result = buurt1.HardEquals(buurt2);
        
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void HardEquals_ShouldReturnFalse_ForDifferentBuurt()
    {
        // Arrange
        var buurt1 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = _validNis6Code,
            NaamNl = _validNaamNl,
            NaamFr = _validNaamFr,
            NaamDe = _validNaamDe
        };
        var buurt2 = new Buurt()
        {
            StatistischeSectorCode = _validSectorCode,
            Nis6DeelGemeente = "200320B",
            NaamNl = "Andere Buurt",
            NaamFr = "Autre Quartier",
            NaamDe = "Anderer Stadtteil"
        };

        // Act
        var result = buurt1.HardEquals(buurt2);

        // Assert
        Assert.False(result);
    }
}