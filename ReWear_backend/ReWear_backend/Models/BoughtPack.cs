namespace ReWear_backend.Models
{
    public class BoughtPack
    {
        public BoughtPack() { }
        public BoughtPack(Guid id, DateTime boughtDate, PremiumPack premiumPack)
        {
            Id = Id;
            BoughtDate = boughtDate;
            PremiumPack = premiumPack;
        }
        public Guid Id { get; set; }
        public DateTime BoughtDate { get; set; }
        public PremiumPack PremiumPack { get; set; }
    }
}
