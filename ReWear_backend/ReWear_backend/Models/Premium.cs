namespace ReWear_backend.Models
{
    public class Premium
    {
        public Premium()
        {
            IsPremium = false;
            EndPremiumDate = DateTime.Now;
        }
        public bool IsPremium { get; set; }
        public DateTime EndPremiumDate { get; set; }

    }
}
