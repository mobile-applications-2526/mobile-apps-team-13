using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Services;

public class TokenService(ILogger<TokenService> logger)
{
    private const int ExpirationHours = 8;

    public virtual string CreateToken(User player, bool rememberMe = false)
    {
        var expiration = DateTime.UtcNow.AddHours(ExpirationHours);
        var token = CreateJwtToken(
            CreateClaims(player),
            CreateSigningCredentials(),
            expiration
        );
        var tokenHandler = new JwtSecurityTokenHandler();

        logger.LogInformation("JWT Token created");
        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
        DateTime expiration) =>
        new(
            new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtTokenSettings")["ValidIssuer"],
            new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtTokenSettings")["ValidAudience"],
    claims,
            expires: expiration,
            signingCredentials: credentials
        );

    private List<Claim> CreateClaims(User player)
    {
        var jwtSub = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtTokenSettings")["JwtRegisteredClaimNamesSub"];

        try
        {
            var claims = new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, jwtSub!),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, player.Id),
                        new Claim(ClaimTypes.Name, player.UserName!),
                        new Claim(ClaimTypes.Email, player.Email!),
                        new Claim(ClaimTypes.Role, Utils.AuthUtils.RoleToRolesString(player.Role))
                    };

            return claims;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private SigningCredentials CreateSigningCredentials()
    {
        var symmetricSecurityKey = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("JwtTokenSettings")["SymmetricSecurityKey"];

        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(symmetricSecurityKey!)
            ),
            SecurityAlgorithms.HmacSha256
        );
    }

    public string GetUserIdFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(token);
        var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            throw new Exception("User ID claim not found in token");
        }

        return userIdClaim.Value;
    }
}