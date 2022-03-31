namespace ReWear_backend.Models
{
    public class Size
    {
        private Size() { }//Empty contructor for EF to make migrations, private so like this noone else instead of EF can access to it
        public Size(Guid id, string name, SizeType sizeType)
        {
            Id = id;
            Name = name;
            SizeType = sizeType;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public SizeType SizeType { get; set; }
    }
}
