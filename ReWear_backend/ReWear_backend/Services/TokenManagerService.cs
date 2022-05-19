using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReWear_backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReWear_backend.Services
{
    public class TokenManagerService
    {
        private readonly UserManager<ReWearUser> _userManager;
        private readonly JwtConfigSecret _jwtConfig;
        public TokenManagerService(UserManager<ReWearUser> userManager, IOptionsMonitor<JwtConfigSecret> JwtConfigSecretOptionsMonitor)
        {
            _userManager = userManager;
            _jwtConfig = JwtConfigSecretOptionsMonitor.CurrentValue;
        }
        public async Task<string> GenerateJwtTokenFromIdentityUser(ReWearUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            // Nous obtenons notre secret à partir des paramètres de l'application.
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            // Nous devons utiliser les claims qui sont des propriétés de notre token et qui donnent des informations sur le token.
            // qui appartiennent à l'utilisateur spécifique à qui il appartient
            // donc il peut contenir son id, son nom, son email. L'avantage est que ces informations
            // sont générées par notre serveur qui est valide et de confiance.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim("Username", user.UserName),
                    new Claim("IsAdmin", user.IsAdmin.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                }),

                Expires = DateTime.UtcNow.AddHours(6),
                // ici, nous ajoutons l'information sur l'algorithme de cryptage qui sera utilisé pour décrypter notre token.
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            //another way to add claims to token
            tokenDescriptor.Subject.AddClaim(new Claim("school", "epsic"));
            tokenDescriptor.Subject.AddClaim(new Claim("IsPremium", user.IsPremium().ToString()));

            var userRoles = await _userManager.GetRolesAsync(user);
            userRoles.ToList().ForEach(role => {
                tokenDescriptor.Subject.AddClaim(new Claim("role", role));
            });

            if (userRoles.Contains("Doctor"))
            {
                tokenDescriptor.Subject.AddClaim(new Claim("IsDoctor", "true"));
            }

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}
