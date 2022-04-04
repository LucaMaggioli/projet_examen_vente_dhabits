namespace ReWear_backend.Models
{
    public class Category
    {
        private Category() { }//Empty contructor for EF to make migrations, private so like this noone else instead of EF can access to it
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SizeType> SizeTypesForCategory { get; set; }
        public Category(Guid id, string name, List<SizeType> sizeTypesForCategory)
        {
            Id = id;
            Name = name;
            SizeTypesForCategory = sizeTypesForCategory;
        }
    }
}
