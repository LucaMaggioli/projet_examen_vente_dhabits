using ReWear_backend.Models;

namespace ReWear_backend.DTOs
{
    public class DressDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public HealthState? HealthState { get; set; }
        public Size? Size { get; set; }
        public List<Category>? Categories { get; set; }
    }
}
