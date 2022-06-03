using Microsoft.AspNetCore.Authorization;

namespace ReWear_backend.Policies
{
    public class MaxDressOrPremiumRequirement: IAuthorizationRequirement
    {
        public int MaxDresses { get; set; }
        public MaxDressOrPremiumRequirement(int maxDresses)
        {
            MaxDresses = maxDresses;
        }
    }
}