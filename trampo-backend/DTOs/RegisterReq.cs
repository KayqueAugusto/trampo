// DTOs/RegisterReq.cs
public record RegisterReq(string Email, string Password, string ConfirmPassword, string Role, bool AcceptTerms);
