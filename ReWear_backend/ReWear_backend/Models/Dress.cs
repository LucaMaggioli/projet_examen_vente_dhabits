namespace ReWear_backend.Models
{
    public class Dress
    {
        private Dress() { }//Empty contructor for EF to make migrations, private so like this noone else instead of EF can access to it
        public Dress(Guid id, string name, int price, string description, HealthState healthState, Size size, List<Category> categories)
        {

            Id = id;
            Name = name;
            Price = price;
            Description = description;
            HealthState = healthState;
            Size = size;
            Categories = categories;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public List<Category> Categories { get; set; }
        public HealthState HealthState { get; set; }
        public Size Size { get; set; }
    }
}
