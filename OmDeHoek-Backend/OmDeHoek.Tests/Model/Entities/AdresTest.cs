using System;

namespace OmDeHoek.Tests.Model.Entities;

public class AdresTest
{
    private readonly string ValidStraat = "ValidStraat";
    private readonly string ValidHuisnummer = "67";
    private readonly string ValidPostcode = "3001";
    private readonly string ValidDorp = "Heverlee";

    private static readonly User ValidBewoner = new User("User", "user@user.com", new DateOnly(2000, 7, 7) ,"+32412345678");

    [Fact]
    public void Constructor_ShouldCreateAdres()
    {
        // Arrange
        
        // Act
        var adres = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        
        // Assert
        Assert.NotNull(adres);
        Assert.Equal(ValidBewoner, adres.Bewoner);
        Assert.Equal(ValidBewoner.Id, adres.BewonerId);
        Assert.Equal(ValidStraat, adres.Straat);
        Assert.Equal(ValidHuisnummer, adres.Huisnummer);
        Assert.Equal(ValidPostcode, adres.Postcode);
        Assert.Equal(ValidDorp, adres.Dorp);
        Assert.Equal($"{ValidStraat} {ValidHuisnummer}, {ValidPostcode} {ValidDorp}", adres.FullAdress);
    }
    
    [Fact]
    public void Constructor_ShouldCreateAdres_WithoutHuisnummer()
    {
        // Arrange
        
        // Act
        var adres = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        
        // Assert
        Assert.NotNull(adres);
        Assert.NotEqual(adres.Id, Guid.Empty);
        Assert.Equal(ValidBewoner, adres.Bewoner);
        Assert.Equal(ValidBewoner.Id, adres.BewonerId);
        Assert.Equal(ValidStraat, adres.Straat);
        Assert.Null(adres.Huisnummer);
        Assert.Equal(ValidPostcode, adres.Postcode);
        Assert.Equal(ValidDorp, adres.Dorp);
        Assert.Equal($"{ValidStraat} , {ValidPostcode} {ValidDorp}", adres.FullAdress);
    }

    [Fact]
    public void Equals_ShouldReturnTrue_ForSameId()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = "1000",
            Dorp = "Brussel",
            Id = adres1.Id
        };
        
        // Act
        var result = adres1.Equals(adres2);
        
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForDifferentId()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = "1000",
            Dorp = "Brussel"
        };
        
        // Act
        var result = adres1.Equals(adres2);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForNull()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        Adres? adres2 = null;

        // Act
        var result = adres1.Equals(adres2);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Equals_ShouldReturnFalse_ForDifferentType()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        var notAnAdres = new {Id = adres1.Id};
        
        // Act
        var result = adres1.Equals(notAnAdres);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void HardEquals_ShouldReturnTrue_ForSameProperties()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp,
            Id = adres1.Id
        };

        // Act
        var result = adres1.HardEquals(adres2);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void HardEquals_ShouldReturnFalse_ForDifferentProperties()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = "AndereStraat",
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp,
            Id = adres1.Id
        };
        
        // Act
        var result = adres1.HardEquals(adres2);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void HardEquals_ShouldReturnFalse_ForNull()
    {
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        Adres? adres2 = null;
        
        // Act
        var result = adres1.HardEquals(adres2);
        
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Update_ShouldUpdateProperties()
    {
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = "NieuweStraat",
            Huisnummer = "100",
            Postcode = "2000",
            Dorp = "Antwerpen",
            Id = adres1.Id
        };
        
        // Act
        adres1.Update(adres2);
        
        // Assert
        Assert.Equal(adres2.Straat, adres1.Straat);
        Assert.Equal(adres2.Huisnummer, adres1.Huisnummer);
        Assert.Equal(adres2.Postcode, adres1.Postcode);
        Assert.Equal(adres2.Dorp, adres1.Dorp);
    }

    [Fact]
    public void Update_ShouldThrowArgumentException_ForDifferentId()
    {
        // Arrange
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        
        var adres2 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = "NieuweStraat",
            Huisnummer = "100",
            Postcode = "2000",
            Dorp = "Antwerpen"
        };
        
        // Act
        var exception = Assert.Throws<ArgumentException>(() => adres1.Update(adres2));
        
        // Assert
        Assert.Equal("De adressen moeten hetzelfde Id hebben", exception.Message);
    }

    [Fact]
    public void Update_ShouldThrowArgumentException_ForNull()
    {
        var adres1 = new Adres()
        {
            Bewoner = ValidBewoner,
            BewonerId = ValidBewoner.Id,
            Straat = ValidStraat,
            Huisnummer = ValidHuisnummer,
            Postcode = ValidPostcode,
            Dorp = ValidDorp
        };
        Adres? adres2 = null;
        
        // Act
        var exception = Assert.Throws<ArgumentException>(() => adres1.Update(adres2));
        
        // Assert
        Assert.Equal("De adressen moeten hetzelfde Id hebben", exception.Message);
    }
}