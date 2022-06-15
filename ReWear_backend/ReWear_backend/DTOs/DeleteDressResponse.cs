using ReWear_backend.Models;

namespace ReWear_backend.DTOs
{
    public class DeleteDressResponse
    {
        public string Token { get; set; }
        public bool Result { get; set; }
        public Dress DeletedDress { get; set; }
    }
}
