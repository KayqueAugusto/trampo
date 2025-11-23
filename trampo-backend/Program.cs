// Program.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// CORS para Vite (5173/5174)
builder.Services.AddCors(p => p.AddDefaultPolicy(c =>
    c.WithOrigins("http://localhost:5173", "http://localhost:5174")
     .AllowAnyHeader().AllowAnyMethod().AllowCredentials()
));

// JWT
var jwtKey = builder.Configuration["Jwt:Key"] 
             ?? "trampo_super_secret_key_2025_muito_grande_mesmo_123456";

var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "TrampoAuthApi";
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = false,
            IssuerSigningKey = signingKey,
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

// “Banco” em memória
var users = new ConcurrentDictionary<string, User>(); // Models/User.cs
var refreshTokens = new ConcurrentDictionary<string, string>();

// --- ROTAS ---
app.MapPost("/api/auth/register", (RegisterReq req, HttpResponse res) =>
{
    if (req.Password != req.ConfirmPassword) return Results.BadRequest(new { error = "Senhas não coincidem" });
    if (!req.AcceptTerms) return Results.BadRequest(new { error = "É preciso aceitar os termos" });
    if (users.Values.Any(u => u.Email == req.Email)) return Results.Conflict(new { error = "Email já cadastrado" });

    var id = Guid.NewGuid().ToString();
    var user = new User
    {
        Id = id,
        Name = req.Email.Split('@')[0],
        Email = req.Email,
        Role = req.Role,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password)
    };
    users[id] = user;

    var access = JwtHelper.SignAccess(user, signingKey, jwtIssuer);
    var refresh = JwtHelper.SignRefresh(user, signingKey, jwtIssuer);
    refreshTokens[user.Id] = refresh;

    res.Cookies.Append("refresh_token", refresh, new CookieOptions
    {
        HttpOnly = true, SameSite = SameSiteMode.Lax, Secure = false,
        Expires = DateTime.UtcNow.AddDays(7)
    });

    return Results.Ok(new { access_token = access, user = new { user.Id, user.Name, user.Email, user.Role } });
});

app.MapPost("/api/auth/login", (LoginReq req, HttpResponse res) =>
{
    var user = users.Values.FirstOrDefault(u => u.Email == req.Email);
    if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
        return Results.Unauthorized();

    var access = JwtHelper.SignAccess(user, signingKey, jwtIssuer);
    var refresh = JwtHelper.SignRefresh(user, signingKey, jwtIssuer);
    refreshTokens[user.Id] = refresh;

    res.Cookies.Append("refresh_token", refresh, new CookieOptions
    {
        HttpOnly = true, SameSite = SameSiteMode.Lax, Secure = false,
        Expires = DateTime.UtcNow.AddDays(7)
    });

    return Results.Ok(new { access_token = access, user = new { user.Id, user.Name, user.Email, user.Role } });
});

app.MapPost("/api/auth/refresh", (HttpRequest req) =>
{
    if (!req.Cookies.TryGetValue("refresh_token", out var token)) return Results.Unauthorized();

    var userId = JwtHelper.ValidateRefresh(token, signingKey, jwtIssuer);
    if (userId is null) return Results.Unauthorized();

    if (!refreshTokens.TryGetValue(userId, out var stored) || stored != token) return Results.Unauthorized();

    var u = users[userId];
    var newAccess = JwtHelper.SignAccess(u, signingKey, jwtIssuer);
    return Results.Ok(new { access_token = newAccess });
});

app.MapGet("/api/auth/me", (ClaimsPrincipal p) =>
{
    var id = p.FindFirstValue(JwtRegisteredClaimNames.Sub);
    if (id is null || !users.TryGetValue(id, out var u)) return Results.Unauthorized();
    return Results.Ok(new { u.Id, u.Name, u.Email, u.Role });
}).RequireAuthorization();

app.Run();
