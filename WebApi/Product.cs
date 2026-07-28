using System.ComponentModel.DataAnnotations;

namespace WebApiHandson
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product ka Name mandatory hai!")]
        [StringLength(100, ErrorMessage = "Name 100 characters se bada nahi ho sakta.")]
        public string Name { get; set; }

        [Range(1, 500000, ErrorMessage = "Price hamesha 1 se 5,00,000 ke beech honi chahiye!")]
        public decimal Price { get; set; }

        [Range(0, 1000, ErrorMessage = "Stock negative nahi ho sakta.")]
        public int Stock { get; set; }
    }
}