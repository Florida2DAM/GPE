using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GPE.Models
{
    public class OrderLine
    {
        public OrderLine()
        {

        }

        public OrderLine(int orderLineId, int orderId, int articleId, string lot, string description, double price, string brand, string category, int quantity, int iva, int discount)
        {
            OrderLineId = orderLineId;
            OrderId = orderId;
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

        public int OrderLineId { get; set; }
        public int OrderId { get; set; }
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