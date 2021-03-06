using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReWear_backend.Models;

namespace ReWear_backend.Data
{
    public class ReWearDataContext : IdentityDbContext<ReWearUser>
    {
        public DbSet<Dress> Dresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<HealthState> HealthStates { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<SizeType> SizeTypes { get; set; }
        public DbSet<PremiumPack> PremiumPacks { get; set; }
        public DbSet<BoughtPack> BoughtPacks { get; set; }

        //constructor take in parameter a instance of "options of type ReWearContext" and pass it to the parent with :base 
        public ReWearDataContext(DbContextOptions<ReWearDataContext> dataContextOptions) : base(dataContextOptions)
        {

        }
    }
}
