namespace ReWear_backend.Models
{
    public class HealthState
    {
        private HealthState() { } //Empty contructor is for EF that need it to make migrations, it can be private so like this noone else instead of EF can access to it
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
