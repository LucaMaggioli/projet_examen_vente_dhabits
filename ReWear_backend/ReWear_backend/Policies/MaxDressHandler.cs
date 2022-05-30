using Microsoft.AspNetCore.Authorization;

namespace ReWear_backend.Policies
{
    public class MaxDressHandler : AuthorizationHandler<MaxDressRequirement, int>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MaxDressRequirement requirement, int userDressesCount)
        {
            if (userDressesCount >= requirement.MaxDresses)
            {
                context.Succeed(requirement);
            }
            
            return Task.CompletedTask;
        }
    }
}
