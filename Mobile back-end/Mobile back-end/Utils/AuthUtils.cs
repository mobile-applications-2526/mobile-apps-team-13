using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.WebUtilities;
using Mobile_back_end.Model.Enums;
using Newtonsoft.Json.Linq;

namespace Mobile_back_end.Utils;

public class AuthUtils
{
    public static string RoleToRolesString(Roles role)
    {
        var roles = Enum.GetValues<Roles>().Where(value => (value & role) != 0).ToList();

        return string.Join(',', roles);
    }

    public static Roles RolesStringToRole(string rolesString)
    {
        Roles role = 0;
        string[] roles = rolesString.Split(',');

        foreach (string value in roles)
        {
            var tmp = Enum.Parse<Roles>(value);
            role |= tmp;
        }

        return role;
    }
    
    public static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
    
    private static long GetTokenExpirationTime(string token)
    {
        var jsonPayload = GetTokenPayload(token);
        
        var tokenExp = jsonPayload["exp"]!.ToString();
        var ticks= long.Parse(tokenExp);
        return ticks;
    }

    public static bool CheckTokenIsValid(string token)
    {
        var tokenTicks = GetTokenExpirationTime(token);
        var tokenDate = DateTimeOffset.FromUnixTimeSeconds(tokenTicks).UtcDateTime;

        var now = DateTime.Now.ToUniversalTime();

        var valid = tokenDate >= now;

        return valid;
    }
    
    public static string GetTokenEmail(string token)
    {
        var jsonPayload = GetTokenPayload(token);
        
        return jsonPayload[ClaimTypes.Email]!.ToString();
    }
    
    private static JObject GetTokenPayload(string token)
    {
        var tokenString = token.Replace("Bearer ", "");
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(tokenString);
        var base64Payload = jwtSecurityToken.RawPayload;
        var data = WebEncoders.Base64UrlDecode(base64Payload);
        var payload = Encoding.UTF8.GetString(data);
        var jsonPayload = JObject.Parse(payload);
        
        return jsonPayload;
    }
}