namespace ReWear_backend.Models
{
    public class SizeType
    {
        private SizeType() { }//Empty contructor for EF to make migrations, private so like this noone else instead of EF can access to it
        public SizeType(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
