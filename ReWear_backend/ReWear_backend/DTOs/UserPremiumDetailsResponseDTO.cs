using ReWear_backend.Models;

namespace ReWear_backend.DTOs
{
    public class UserPremiumDetailsResponseDTO
    {
        public DateTime EndPremiumDate { get; set; }
        public bool IsPremium { get; set; }
        public bool IsAdmin { get; set; }
        public List<BoughtPack> BoughtPacks { get; set; }
    }
}
