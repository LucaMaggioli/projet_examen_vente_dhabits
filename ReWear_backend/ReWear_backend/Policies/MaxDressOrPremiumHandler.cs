using Microsoft.AspNetCore.Authorization;

namespace ReWear_backend.Policies
{
    public class MaxDressOrPremiumHandler : AuthorizationHandler<MaxDressOrPremiumRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MaxDressOrPremiumRequirement requirement)
        {
            var userId = context.User.Claims.First(i => i.Type == "Id").Value;
            var endPremiumDate = DateTime.Parse(context.User.Claims.First(c => c.Type == "endPremiumDate").Value);

            if (Int32.TryParse(context.User.Claims.First(i => i.Type == "dressesCount").Value, out int userDressesCount))
            {
                if (userDressesCount < requirement.MaxDresses)
                {
                    context.Succeed(requirement);
                }
                else if (endPremiumDate >= DateTime.Now)
                {
                    context.Succeed(requirement);
                }
            }
            return Task.CompletedTask;
        }
    }
}
