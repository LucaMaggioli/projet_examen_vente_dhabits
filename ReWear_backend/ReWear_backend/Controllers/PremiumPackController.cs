using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ReWearDataContext _reWearDataContext;
        private readonly TokenManagerService _tokenManagerService;
        private readonly UserService _userService;
        public PremiumPackController(ReWearDataContext reWearDataContext, TokenManagerService tokenManagerService, UserService userService)
        {
            _reWearDataContext = reWearDataContext;
            _tokenManagerService = tokenManagerService;
            _userService = userService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPremiumPacks()
        {
            var allPremiumPacks = _reWearDataContext.PremiumPacks.ToList();
            return Ok(allPremiumPacks);
        }

        [HttpPost("add")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "AdminOnly")]
        public async Task<IActionResult> AddPremiumPack([FromBody]PremiumPackDto premiumPackToAdd)
        {
            var addedPP = _reWearDataContext.PremiumPacks.Add(new PremiumPack(premiumPackToAdd));
            await _reWearDataContext.SaveChangesAsync();
            return Ok(addedPP.Entity);
        }

        [HttpPatch("{premiumPackId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "AdminOnly")]
        public async Task<IActionResult> UpdatePremiumPack(Guid premiumPackId) //[FromBody] PremiumPackDto PremiumPackToAddDto
        {
            return Ok("Still not implemented");
        }

        [HttpDelete("{premiumPackId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "AdminOnly")]
        public async Task<IActionResult> DeletePremiumPack(Guid premiumPackId)
        {
            var premiumPack = await _reWearDataContext.PremiumPacks.FirstOrDefaultAsync(p=> p.Id == premiumPackId);
            if (premiumPack == null) return NotFound("PremiumPack not Found with given Id");

            _reWearDataContext.PremiumPacks.Remove(premiumPack);
            await _reWearDataContext.SaveChangesAsync();

            return Ok("Premium Pack succesfully deleted");
        }

        [HttpGet("buy/{premiumPackId}")]
        [Authorize (AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> BuyPremiumPack(Guid premiumPackId)
        {
            var loggedUser = _userService.GetFullUser();
            if (loggedUser == null) return NotFound("User with token Id not found (cela ne devrais jamais se produire sinon c'est grave!)");

            var premiumPackToBuy = _reWearDataContext.PremiumPacks.FirstOrDefault(p => p.Id == premiumPackId);
            if (premiumPackToBuy == null) return NotFound("Premium Pack not found with given Id");

            var updatedUser = _userService.BuyPremiumPackForUser(loggedUser, premiumPackToBuy);

            var updatedToken = await _tokenManagerService.GenerateJwtTokenFromIdentityUser(updatedUser);

            return Ok(new PremiumPackBoughtResponse
            {
                Result = true,
                Token = updatedToken
            });
        }
    }
}
