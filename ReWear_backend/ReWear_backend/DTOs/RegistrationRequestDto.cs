namespace ReWear_backend.DTOs
{
    public class RegistrationRequestDto
    {
        //[Required]
        public string Name { get; set; }

        //[Required]
        public string Email { get; set; }

        //[Required]
        public string Password { get; set; }
    }
}
