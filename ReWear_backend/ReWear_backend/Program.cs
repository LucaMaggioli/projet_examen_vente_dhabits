using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ReWear_backend.Data;
using ReWear_backend.Models;
using ReWear_backend.Policies;
using ReWear_backend.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "ReWear backend API documentation", Version = "v1.0.0" });
    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };
    options.AddSecurityDefinition("Bearer", securitySchema);
    var securityRequirement = new OpenApiSecurityRequirement
                {
                    { securitySchema, new[] { "Bearer" } }
                };

    options.AddSecurityRequirement(securityRequirement);
});

//add Context that use Sqlite
builder.Services.AddDbContext<ReWearDataContext>(options => options.UseSqlite(@"Data Source=ReWear.db;"));

//builder.Configuration.GetSection("JwtConfig") allow us to use the "JwtConfig" into "appsettings.json";
builder.Services.Configure<JwtConfigSecret>(builder.Configuration.GetSection("JwtConfig"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(jwt =>
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]);

        jwt.SaveToken = true;
        jwt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = true,
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy=> policy.RequireClaim("IsAdmin", "True")) ;
    options.AddPolicy("Max5DressesOrPremium", policy =>
                policy.AddRequirements(new MaxDressOrPremiumRequirement(6)));
    });

//inject IdentityUser and IdentityRole to DbContext
builder.Services.AddIdentity<ReWearUser, IdentityRole>(options => { //ReWearUser extends from IdentityUser
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ReWearDataContext>();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
    options.Lockout.MaxFailedAccessAttempts = 3;

    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
});

builder.Services.AddTransient<TokenManagerService>();
builder.Services.AddTransient<RegexUtilities>();
builder.Services.AddTransient<UserService>();

builder.Services.AddSingleton<IAuthorizationHandler, MaxDressOrPremiumHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, IsPremiumHandler>();

//the following line allow to use the HttpContextAccessor in controller for example to acces the JWT access_token
//builder.Services.AddHttpContextAccessor();
//builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//To allow Cors
app.UseCors(c =>  c
                .AllowAnyOrigin()
                .AllowAnyHeader()
                );

app.Run();
