namespace ReWear_backend.Models
{
    public class Category
    {
        public Category(int id, string name, List<SizeType> sizeTypesForCategory)
        {
            Id = id;
            Name = name;
            SizeTypesForCategory = sizeTypesForCategory;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<SizeType> SizeTypesForCategory { get; set; }

    }
}
