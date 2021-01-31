using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GPE.Models
{
    public class OrderLines
    {
        public OrderLines()
        {

        }
        public OrderLines(int orderId, int lineId, int articleId, string lot, string description, int stock, double price, string brand, string category, int quantity, int iva, int discount)
        {
            OrderId = orderId;
            LineId = lineId;
            ArticleId = articleId;
            Lot = lot;
            Description = description;
            Stock = stock;
            Price = price;
            Brand = brand;
            Category = category;
            Quantity = quantity;
            Iva = iva;
            Discount = discount;
        }

        [Key]
        public int OrderId { get; set; }
        [Key]
        public int LineId { get; set; }
        public int ArticleId { get; set; }
        public string Lot { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public int Iva { get; set; }
        public int Discount { get; set; }

        public Order Orders { get; set; }
        public List<Article> Articles { get; set; }
    }
}