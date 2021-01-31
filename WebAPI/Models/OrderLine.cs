using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPE.Models
{
    public class OrderLine
    {
        public OrderLine()
        {

        }
        public OrderLine(int orderId, int lineId, int articleId, string lot, string description, double price, string brand, string category, int quantity, int iva, int discount)
        {
            OrderId = orderId;
            LineId = lineId;
            ArticleId = articleId;
            Lot = lot;
            Description = description;
            Price = price;
            Brand = brand;
            Category = category;
            Quantity = quantity;
            Iva = iva;
            Discount = discount;
        }

        [Key, Column(Order = 0)]
        public int OrderId { get; set; }
        [Key, Column(Order = 1)]
        public int LineId { get; set; }
        public int ArticleId { get; set; }
        [Required]
        [StringLength(50)]
        public string Lot { get; set; }
        [Required]
        [StringLength(150)]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        [StringLength(50)]
        public string Brand { get; set; }
        [Required]
        [StringLength(50)]
        public string Category { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int Iva { get; set; }
        public int Discount { get; set; }

        public Order Order { get; set; }
        public Article Article { get; set; }
    }
}