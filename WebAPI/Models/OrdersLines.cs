using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class OrdersLines
    {
        public OrdersLines()
        {

        }
        public OrdersLines(int orderId, int lineId, int articleId, string lot, string description, int stock, double price, string brand, string category, int quantity, int iva, int discount)
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

        public int OrderId { get; set; }
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

        public Orders Orders { get; set; }
        public List<Articles> Articles { get; set; }
    }
}