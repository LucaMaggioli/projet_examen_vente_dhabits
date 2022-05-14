using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.Models;
using ReWear_backend.Data;
using ReWear_backend.Services;
using ReWear_backend.DTOs;

namespace ReWear_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PremiumPackController : ControllerBase
    {
        private readonly UserManager<ReWearUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ReWearDataContext _reWearDataContext;
        private readonly TokenManagerService _tokenManagerService;
        public PremiumPackController(IHttpContextAccessor httpContextAccessor, UserManager<ReWearUser> userManager, ReWearDataContext reWearDataContext, TokenManagerService tokenManagerService)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _reWearDataContext = reWearDataContext;
            _tokenManagerService = tokenManagerService;
        }

        [HttpGet("all")]//this route should be in PremiumPack controller
        public async Task<IActionResult> GetAllPremiumPacks() //[FromBody] PremiumPackDto PremiumPackToAddDto
        {
            //_reWearDataContext.PremiumPack.Add()
            return Ok();
        }

        [HttpPost("add")]//this route should be in PremiumPack controller
        public async Task<IActionResult> AddPremiumPack() //[FromBody] PremiumPackDto PremiumPackToAddDto
        {
            //_reWearDataContext.PremiumPack.Add()
            return Ok();
        }

        [HttpPatch("update")]//this route should be in PremiumPack controller
        public async Task<IActionResult> UpdatePremiumPack() //[FromBody] PremiumPackDto PremiumPackToAddDto
        {
            //_reWearDataContext.PremiumPack.Add()
            return Ok();
        }

        [HttpGet("buy/{premiumPackId}")]
        [Authorize (AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> BuyPremiumPack(Guid premiumPackId)
        {
            var loggedUserId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            var loggedUser = _userManager.Users.FirstOrDefault(u => u.Id == loggedUserId);
            if (loggedUser == null) return NotFound("User with token Id not found (cela ne devrais jamais se produire sinon c'est grave!)");

            var premiumPackToBuy = _reWearDataContext.PremiumPacks.FirstOrDefault(p => p.Id == premiumPackId);
            if (premiumPackToBuy == null) return NotFound("Premium Pack not found with given Id");

            #region This code should be into another class to separate responsabilityes and allow unit tests
            loggedUser.BoughtPacks.Add(new BoughtPack(new Guid(), DateTime.Now, premiumPackToBuy));
            if(loggedUser.EndPremiumDate < DateTime.Now)
            {
                loggedUser.EndPremiumDate = DateTime.Now .AddDays(premiumPackToBuy.ValidityDays);
            }
            else
            {
                loggedUser.EndPremiumDate.AddDays(premiumPackToBuy.ValidityDays);
            }
            _reWearDataContext.SaveChanges();
            var updatedToken = await _tokenManagerService.GenerateJwtTokenFromIdentityUser(loggedUser);
            #endregion

            return Ok(new PremiumPackBoughtResponse
            {
                Result = true,
                Token = updatedToken
            });
        }
    }
}
