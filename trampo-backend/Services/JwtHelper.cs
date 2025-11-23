// Services/JwtHelper.cs
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public static class JwtHelper
{
    public static string SignAccess(User u, SymmetricSecurityKey key, string issuer)
    {
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, u.Id),
            new Claim(JwtRegisteredClaimNames.Email, u.Email),
            new Claim("role", u.Role),
            new Claim("name", u.Name)
        };
        var token = new JwtSecurityToken(
            issuer: issuer, audience: null, claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15), signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string SignRefresh(User u, SymmetricSecurityKey key, string issuer)
    {
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[] { new Claim(JwtRegisteredClaimNames.Sub, u.Id) };
        var token = new JwtSecurityToken(
            issuer: issuer, audience: null, claims: claims,
            expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string? ValidateRefresh(string token, SymmetricSecurityKey key, string issuer)
    {
        try
        {
            var handler = new JwtSecurityTokenHandler();
            var param = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = false,
                IssuerSigningKey = key,
                ValidateLifetime = true
            };
            var principal = handler.ValidateToken(token, param, out _);
            return principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
        }
        catch { return null; }
    }
}
