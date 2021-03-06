using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.DTOs;
using ReWear_backend.Models;
using ReWear_backend.Services;

namespace ReWear_backend.Controllers
{

    public class AuthManagerController : ControllerBase
    {
        private readonly TokenManagerService _tokenManagerService;
        private readonly RegexUtilities _regexUtilities;
        private readonly UserManager<ReWearUser> _userManager;


        public AuthManagerController(TokenManagerService tokenManagerService, UserManager<ReWearUser> userManager, RegexUtilities regexUtilities)
        {
            _tokenManagerService = tokenManagerService;
            _userManager = userManager;
            _regexUtilities = regexUtilities;
        }

        [HttpPost]
        [Route("auth/Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto user)
        {
            if (!_regexUtilities.IsValidEmail(user.Email))
            {
                return BadRequest(new RegistrationResponse
                {
                    Result = false,
                    Message = "Bad email"
                }) ;
            }
            var newUser = new ReWearUser { Email = user.Email, UserName = user.Name, IsAdmin = false, Dresses = new List<Dress>(), EndPremiumDate = DateTime.Now, BoughtPacks = new List<BoughtPack>() };
            var isCreated = await _userManager.CreateAsync(newUser, user.Password);
            if (isCreated.Succeeded)
            {
                var jwtToken = await _tokenManagerService.GenerateJwtTokenFromIdentityUser(newUser);

                return Ok(new RegistrationResponse
                {
                    Result = true,
                    Token = jwtToken
                });
            }

            return BadRequest(new RegistrationResponse
            {
                Result = false,
                Message = string.Join(Environment.NewLine, isCreated.Errors.Select(x => x.Description).ToList())
            });
        }

        [HttpPost]
        [Route("auth/Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto user)
        {
            // Vérifier si l'utilisateur avec le même email existe
            var existingUser = await _userManager.Users.Include(u => u.Dresses).FirstOrDefaultAsync(u => u.Email == user.Email);


            if (existingUser != null)
            {
                // Dabors on vérifie si l'utilisateur n'est pas bloqué par un eccés de mot de passes erronés
                var lockoutDate = await _userManager.GetLockoutEndDateAsync(existingUser);
                if (lockoutDate >= DateTimeOffset.Now)
                {
                    var message = $"Too Many Logins With wrong password, wait {(lockoutDate - DateTimeOffset.Now).Value.Minutes + 1} minutes";
                    return BadRequest(new RegistrationResponse
                    {
                        Result = false,
                        Message = message.ToString()
                    });
                }

                // Maintenant, nous devons vérifier si l'utilisateur a entré le bon mot de passe.
                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);
                if (isCorrect)
                {
                    await _userManager.SetLockoutEndDateAsync(existingUser, DateTimeOffset.Now);
                    var jwtToken = await _tokenManagerService.GenerateJwtTokenFromIdentityUser(existingUser);

                    return Ok(new RegistrationResponse
                    {
                        Result = true,
                        UserName = existingUser.UserName,
                        Token = jwtToken
                    });
                }
                else
                {
                    await _userManager.AccessFailedAsync(existingUser);
                }
            }

            // Nous ne voulons pas donner trop d'informations sur la raison de l'échec de la demande pour des raisons de sécurité.
            return BadRequest(new RegistrationResponse
            {
                Result = false,
                Message = "Invalid authentication request"
            });
        }
    }
}
