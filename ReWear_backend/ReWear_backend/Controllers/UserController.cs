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
            var usersNames = _userManager.Users.Select(u => new UserDto { UserName = u.UserName, IsPremium = u.IsPremium }).ToList();
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
            if (!user.IsPremium && user.Dresses.Count() >= 5)
            {
                return Unauthorized("Upgrade to Premium to have more than 5 dresses");
            }

            var newDress = new Dress(DressToAddDto);

            _reWearDataContext.Dresses.Add(newDress);

            user.Dresses.Add(newDress);

            await _reWearDataContext.SaveChangesAsync();

            return Ok(user.Dresses);
        }

        [HttpPost("shouldBeIn/premiumPack/controller")]//this route should be in PremiumPack controller
        public async Task<IActionResult> AddPremiumPack() //[FromBody] PremiumPackDto PremiumPackToAddDto
        {
            //_reWearDataContext.PremiumPack.Add()
            return Ok();
        }

        [HttpGet("me/buyPremiumPack/{premiumPackId}")]
        public async Task<IActionResult> BuyPremiumPack(string premiumPackId)
        {
            //DbContext.getPremiumPack(premiumpackId);
            return Ok();
        }
    }
}
