using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ReWear_backend.Models
{
    public class ReWearUser : IdentityUser
    {
        public List<Dress>? Dresses { get; set; }
        public bool IsAdmin { get; set; }
        //public bool IsPremium { get; set; }
        public DateTime EndPremiumDate { get; set; }
        public List<BoughtPack> BoughtPacks { get; set; }

        public bool? IsPremium()
        {
            return this.EndPremiumDate >= DateTime.Now;
        }
    }
}
