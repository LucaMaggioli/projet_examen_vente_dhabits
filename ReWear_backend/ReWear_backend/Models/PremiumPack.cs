namespace ReWear_backend.Models
{
    public class PremiumPack
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public double ValidityDays { get; set; }
    }
}
