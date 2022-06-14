using ReWear_backend.DTOs;

namespace ReWear_backend.Models
{
    public class Dress
    {
        private Dress() { }//Empty contructor for EF to make migrations, private so like this noone else instead of EF can access to it
        //public Dress(Guid id, string name, int price, string description, HealthState healthState, Size size, List<Category> categories)
        public Dress(Guid id, string name, int price, string description, string imageUrl, string healthState, string size, string category)
        {

            Id = id;
            Name = name;
            Price = price;
            Description = description;
            ImageUrl = imageUrl;
            HealthState = healthState;
            Size = size;
            Category = category;
        }

        public Dress(DressDto dressDto)
        {
            Id = new Guid();
            Name = dressDto.Name;
            Price = dressDto.Price;
            Description = dressDto.Description;
            ImageUrl = dressDto.ImageUrl;
            HealthState = dressDto.HealthState;
            Size = dressDto.Size;
            Category = dressDto.Category;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string HealthState { get; set; }
        public string Size { get; set; }
        public string Category { get; set; }
        //public List<Category>? Categories { get; set; }
        //public HealthState? HealthState { get; set; }
        //public Size? Size { get; set; }
    }
}
