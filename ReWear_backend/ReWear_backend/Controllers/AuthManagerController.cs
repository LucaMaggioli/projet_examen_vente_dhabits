using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReWear_backend.DTOs;
using ReWear_backend.Services;

namespace ReWear_backend.Controllers
{

    public class AuthManagerController : ControllerBase
    {
        private readonly TokenManagerService _tokenManagerService;
        private readonly RegexUtilities _regexUtilities;
        private readonly UserManager<IdentityUser> _userManager;


        public AuthManagerController(TokenManagerService tokenManagerService, UserManager<IdentityUser> userManager, RegexUtilities regexUtilities)
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
            var newUser = new IdentityUser { Email = user.Email, UserName = user.Name };
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
            var existingUser = await _userManager.FindByEmailAsync(user.Email);

            if (existingUser != null)
            {
                // Maintenant, nous devons vérifier si l'utilisateur a entré le bon mot de passe.
                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);

                if (isCorrect)
                {
                    var jwtToken = await _tokenManagerService.GenerateJwtTokenFromIdentityUser(existingUser);

                    return Ok(new RegistrationResponse
                    {
                        Result = true,
                        Token = jwtToken
                    });
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
