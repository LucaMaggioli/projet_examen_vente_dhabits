using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.Data;
using ReWear_backend.DTOs;
using ReWear_backend.Models;
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

        public UserController(UserManager<ReWearUser> userManager, IHttpContextAccessor httpContextAccessor, ReWearDataContext reWearDataContext)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _reWearDataContext = reWearDataContext;
        }

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<UserDto> GetUsers()
        {
            var usersNames = _userManager.Users.Select(u => new UserDto { UserName = u.UserName, IsPremium = u.EndPremiumDate > DateTime.Now}).ToList();
            return usersNames;
        }

        [HttpGet("{username}/dresses")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetDressesByUsername(string username)
        {

            var user = await _userManager.Users.Include(u=>u.Dresses).FirstOrDefaultAsync(u=> u.UserName == username);

            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }

        [HttpGet("me/premiumDetails")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedUserPremiumPacksBought()
        {
            var loggedUserName = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Username").Value;
            var loggedUser = _userManager.Users
                .Include(u => u.BoughtPacks)
                .ThenInclude(boughtPack => boughtPack.PremiumPack)
                .FirstOrDefault(u => u.UserName == loggedUserName);
            if (loggedUser == null) return NotFound("User with token Id not found (cela ne devrais jamais se produire sinon c'est grave!)");

            if (loggedUser.BoughtPacks == null) { return NotFound("User have never bought PremiumPacks"); }
            var boughtPacks = loggedUser.BoughtPacks.ToList();

            UserPremiumDetailsResponseDTO response = new UserPremiumDetailsResponseDTO
            {
                BoughtPacks = boughtPacks,
                //IsPremium = loggedUser.IsPremium(), 
                IsPremium = loggedUser.EndPremiumDate > DateTime.Now,
                IsAdmin = loggedUser.IsAdmin,
                EndPremiumDate = loggedUser.EndPremiumDate
            };

            return Ok(response);
        }

        [HttpGet("me/dresses")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedUserDresses()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            
            var Username = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Username").Value;

            var user = _userManager.Users.Include(user => user.Dresses).FirstOrDefault(u => u.UserName == Username);
            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }


        [HttpPost("me/dress")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddDressToUser([FromBody] DressDto DressToAddDto)
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;

            var user = await _userManager.Users.Include(u => u.Dresses).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();
            if (user.EndPremiumDate <= DateTime.Now && user.Dresses.Count() >= 5)
            {
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
