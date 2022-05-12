namespace ReWear_backend.Models
{
    public class PremiumPack
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public DateTime ValidityTime { get; set; }
    }
}
