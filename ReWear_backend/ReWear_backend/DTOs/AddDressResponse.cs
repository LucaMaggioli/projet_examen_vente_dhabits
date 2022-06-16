using ReWear_backend.Models;

namespace ReWear_backend.DTOs
{
    public class AddDressResponse
    {
        public string Token { get; set; }
        public bool Result { get; set; }
        public List<Dress> Dresses { get; set; }
    }
}
