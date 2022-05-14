using ReWear_backend.Data;
using ReWear_backend.Models;

namespace ReWear_backend
{
    public class PremiumPackDataProvider
    {
        private readonly ReWearDataContext _reWearDbContext;

        public PremiumPackDataProvider(ReWearDataContext reWearDataContext)
        {
            _reWearDbContext = reWearDataContext;
        }

        public void AddPremiumPack(PremiumPack premiumPackToAdd)
        {
            var success = _reWearDbContext.PremiumPacks.Add(premiumPackToAdd);
        }
    }
}
