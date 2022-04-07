using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using ReWear_backend.Data;
using ReWear_backend.Models;
using ReWear_backend.Services;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add Context that use Sqlite
builder.Services.AddDbContext<ReWearDataContext>(options => options.UseSqlite(@"Data Source=ReWearTest.db;"));

//builder.Configuration.GetSection("JwtConfig") allow us to use the "JwtConfig" into "appsettings.json";
builder.Services.Configure<JwtConfigSecret>(builder.Configuration.GetSection("JwtConfig"));
//inject IdentityUser and IdentityRole to DbContext
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => { })
        .AddEntityFrameworkStores<ReWearDataContext>();

builder.Services.AddTransient<TokenManagerService>();
//services.AddTransient<IArticleDataProvider, ArticleDataProvider>();
builder.Services.AddTransient<RegexUtilities>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
