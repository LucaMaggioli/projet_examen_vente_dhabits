namespace ReWear_backend.Models
{
    public class Size
    {
        public Size(int id, string name, SizeType sizeType)
        {
            Id = id;
            Name = name;
            SizeType = sizeType;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public SizeType SizeType { get; set; }
    }
}
