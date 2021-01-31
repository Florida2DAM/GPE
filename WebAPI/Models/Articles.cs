using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Articles
    {
        public Articles()
        {

        }
        public Articles(int articleId, string description, string lot, int stock, double price, string brand, string category, int iva)
        {
            ArticleId = articleId;
            Description = description;
            Lot = lot;
            Stock = stock;
            Price = price;
            Brand = brand;
            Category = category;
            Iva = iva;
        }


        public int ArticleId { get; set; }
        public string Description { get; set; }
        public string Lot { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Iva { get; set; }

        public Orders Orders { get; set; }
    }
}