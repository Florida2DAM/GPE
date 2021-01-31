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
        public string Lot { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public int Iva { get; set; }
        public int Discount { get; set; }

        public Order Order { get; set; }
        public List<Article> Articles { get; set; }
    }
}