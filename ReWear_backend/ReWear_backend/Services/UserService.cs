using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.Data;
using ReWear_backend.Models;

namespace ReWear_backend.Services
{
    public class UserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ReWearUser> _userManager;
        private readonly ReWearDataContext _reWearDataContext;

        public UserService(IHttpContextAccessor httpContextAccessor, UserManager<ReWearUser> userManager, ReWearDataContext reWearDataContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _reWearDataContext = reWearDataContext;
        }

        public ReWearUser GetUserLogged()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            var loggedUser = _userManager.Users.FirstOrDefault(u => u.Id == userId);
            return loggedUser;
        }
        public ReWearUser GetUserLoggedWithDresses()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            var loggedUser = _userManager.Users
                .Include(u=> u.Dresses)
                .FirstOrDefault(u => u.Id == userId);
            return loggedUser;
        }
        public ReWearUser GetUserLoggedWithBoughPacks()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(i => i.Type == "Id").Value;
            var loggedUser = _userManager.Users
                .Include(u => u.BoughtPacks)
                .ThenInclude(boughtPack => boughtPack.PremiumPack)
                .FirstOrDefault(u => u.Id == userId);

            return loggedUser;
        }
        public ReWearUser BuyPremiumPackForUser(ReWearUser user, PremiumPack premiumPackToBuy)
        {
            user.BoughtPacks.Add(new BoughtPack(new Guid(), DateTime.Now, premiumPackToBuy));
            if (user.EndPremiumDate < DateTime.Now)
            {
                user.EndPremiumDate = DateTime.Now.AddDays(premiumPackToBuy.ValidityDays);
            }
            else
            {
                user.EndPremiumDate.AddDays(premiumPackToBuy.ValidityDays);
            }
            _reWearDataContext.SaveChanges();

            return user;
        }
    }
}
