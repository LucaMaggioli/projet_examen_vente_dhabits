using ReWear_backend.Models;

namespace ReWear_backend.DTOs
{
    public class DressDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string HealthState { get; set; }
        public string Size { get; set; }
        public string Category { get; set; }
        //public HealthState? HealthState { get; set; }
        //public Size? Size { get; set; }
        //public List<Category>? Categories { get; set; }
    }
}
