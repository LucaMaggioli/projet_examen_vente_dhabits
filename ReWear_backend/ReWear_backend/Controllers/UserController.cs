using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public UserController(UserManager<ReWearUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
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

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }

        [HttpGet("me/dresses")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoggedUserDresses()
        {

            var accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
            var username = _httpContextAccessor.HttpContext.User.Identity.Name;
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            //var usub = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "sub").Value; --> not ok
            var Username = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Username").Value;
            //var uSubububuUsername = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == JwtRegisteredClaimNames.Sub).Value; --> not ok

            //var uemail = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "email").Value; --> noOk!!
            //var smt = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            //var userMail = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "sub").Value;

            var user = _userManager.Users.FirstOrDefault(u => u.UserName == Username);
            if (user == null) return NotFound();

            return Ok(user.Dresses);
        }
    }
}
