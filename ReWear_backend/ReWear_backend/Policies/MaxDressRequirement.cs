using Microsoft.AspNetCore.Authorization;

namespace ReWear_backend.Policies
{
    public class MaxDressRequirement: IAuthorizationRequirement
    {
        public int MaxDresses { get; set; }
        public MaxDressRequirement(int maxDresses)
        {
            MaxDresses = maxDresses;
        }
    }
}