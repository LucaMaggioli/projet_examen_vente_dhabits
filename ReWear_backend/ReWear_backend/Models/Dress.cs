namespace ReWear_backend.Models
{
    public class Dress
    {
        public Dress(int id, string name, int price, string description, List<Category> categories, HealthState healthState, Size size)
        {
            Id = id;
            Name = name;
            Price = price;
            Description = description;
            Categories = categories;
            HealthState = healthState;
            Size = size;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public List<Category> Categories { get; set; }
        public HealthState HealthState { get; set; }
        public Size Size { get; set; }
    }
}
