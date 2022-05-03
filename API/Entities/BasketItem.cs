using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // Navigation Properties => These tell EF of the relationship between Entities 
        // so it can give a proper migration with proper features (eg, cascating deletes, etc.)
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int BasketId { get; set; }
        public Basket Basket {get; set;}
    }
}