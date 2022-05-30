using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.Data;
using ReWear_backend.DTOs;
using ReWear_backend.Models;
using ReWear_backend.Services;
using System.IdentityModel.Tokens.Jwt;

namespace ReWear_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ReWearUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ReWearDataContext _reWearDataContext;
        private readonly UserService _userService;
        private readonly IAuthorizationService _authorizationService;


        public UserController(
            UserManager<ReWearUser> userManager,
            IHttpContextAccessor httpContextAccessor,
            ReWearDataContext reWearDataContext,
            UserService userService,
            IAuthorizationService authorizationService)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _reWearDataContext = reWearDataContext;
            _userService = userService;
            _authorizationService = authorizationService;
        }

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<UserDto> GetUsers()
        {
            var usersNames = _userManager.Users.Select(u => new UserDto { UserName = u.UserName, IsPremium = u.EndPremiumDate > DateTime.Now}).ToList();
            return usersNames;
        }


        [HttpPatch("{username}/upgradeToAdmin")]
        [Authorize (AuthenticationSchemes = "Bearer", Policy ="AdminOnly")]
        public async Task<IActionResult> UpgradeUserToAdmin(string username, [FromBody]bool isAdmin)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u=> u.UserName == username);
            if(user == null) { return NotFound("User not found with given userName"); }

            user.IsAdmin = isAdmin;

            var updated = await _userManager.UpdateAsync(user);

            //if the user that is updated is the logged user, I should return His new token with updated IsAdmin claim

            if (updated.Succeeded) { return Ok(updated); }
            else { return BadRequest(updated); }
        }

        [HttpGet("{username}/dresses")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetDressesByUsername(string username)
        {

            var user = await _userManager.Users.Include(u=>u.Dresses).FirstOrDefaultAsync(u=> u.UserName == username);

            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }
        
        [HttpGet("me/dresses")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedUserDresses()
        {
            var user = _userService.GetUserLoggedWithDresses();
            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }

        [HttpGet("me/premiumDetails")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedUserPremiumPacksBought()
        {
            var loggedUser = _userService.GetUserLoggedWithBoughPacks();
            if (loggedUser == null) return NotFound("User with token Id not found (cela ne devrais jamais se produire sinon c'est grave!)");

            UserPremiumDetailsResponseDTO response = new UserPremiumDetailsResponseDTO
            {
                BoughtPacks = loggedUser.BoughtPacks.ToList(),
                IsPremium = loggedUser.EndPremiumDate > DateTime.Now,
                IsAdmin = loggedUser.IsAdmin,
                EndPremiumDate = loggedUser.EndPremiumDate
            };

            return Ok(response);
        }

        [HttpPost("me/dress")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddDressToUser([FromBody] DressDto DressToAddDto)
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;

            var user = await _userManager.Users.Include(u => u.Dresses).FirstOrDefaultAsync(u => u.Id == userId);
            
            var userDressesCount = user.Dresses.Count();




            if (user == null) return NotFound("User not found with Id in claim");
            if (user.EndPremiumDate <= DateTime.Now && user.Dresses.Count() >= 5)
            {
                return Forbid("Upgrade to Premium to have more than 5 dresses");
                return Unauthorized("Upgrade to Premium to have more than 5 dresses");
            }

            var newDress = new Dress(DressToAddDto);

            _reWearDataContext.Dresses.Add(newDress);

            user.Dresses.Add(newDress);

            await _reWearDataContext.SaveChangesAsync();

            return Ok(user.Dresses);
        }
    }
}
