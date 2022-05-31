namespace ReWear_backend.DTOs
{
    public class RegistrationResponse
    {
        public string Token { get; set; }
        public bool Result { get; set; }
        public string UserName { get; set;}
        public string Message { get; set; }
    }
}
