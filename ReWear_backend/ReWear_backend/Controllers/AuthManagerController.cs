using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReWear_backend.DTOs;
using ReWear_backend.Services;

namespace ReWear_backend.Controllers
{

    public class AuthManagerController : ControllerBase
    {
        private readonly TokenManagerService _tokenManagerService;
        private readonly UserManager<IdentityUser> _userManager;


        public AuthManagerController(TokenManagerService tokenManagerService, UserManager<IdentityUser> userManager)
        {
            _tokenManagerService = tokenManagerService;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("auth/Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto user)
        {
            var newUser = new IdentityUser { Email = user.Email, UserName = user.Email };
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
    }
}
