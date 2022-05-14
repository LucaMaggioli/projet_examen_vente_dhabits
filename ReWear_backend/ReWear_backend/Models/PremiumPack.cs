using ReWear_backend.DTOs;

namespace ReWear_backend.Models
{
    public class PremiumPack
    {
        public PremiumPack() { }
        public PremiumPack(PremiumPackDto premiumPackDto)
        {
            Id = new Guid();
            Name = premiumPackDto.Name;
            Price = premiumPackDto.Price;
            ValidityDays = premiumPackDto.ValidityDays;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public double ValidityDays { get; set; }
    }
}
