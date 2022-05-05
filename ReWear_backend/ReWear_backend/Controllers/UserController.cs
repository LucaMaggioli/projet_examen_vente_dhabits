﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReWear_backend.DTOs;
using ReWear_backend.Models;

namespace ReWear_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ReWearUser> _userManager;

        public UserController(UserManager<ReWearUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<UserDto> GetUsers()
        {
            var usersNames = _userManager.Users.Select(u=> new UserDto { UserName = u.UserName } ).ToList();
            return usersNames;
        }
    }
}
