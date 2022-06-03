using Microsoft.AspNetCore.Authorization;

namespace ReWear_backend.Policies
{
    public class IsPremiumHandler : AuthorizationHandler<IsPremiumRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsPremiumRequirement requirement)
        {
            var endPremiumDate = DateTime.Parse(context.User.Claims.First(c => c.Type == "endPremiumDate").Value);

            if (endPremiumDate >= DateTime.Now)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
