﻿using Microsoft.AspNetCore.Identity;

namespace ReWear_backend.Models
{
    public class ReWearUser : IdentityUser
    {
        public List<Dress> Dresses { get; set; }
    }
}
