using Microsoft.AspNetCore.Identity;

namespace ReWear_backend.Models
{
    public class ReWearUser : IdentityUser
    {
        public List<Dress>? Dresses { get; set; }
        public bool IsPremium { get; set; }
        public DateTime EndPremiumDate { get; set; }
        //public Premium Premium { get; set; }
    }
}
