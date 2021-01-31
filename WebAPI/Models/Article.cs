using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Article
    {
        public Article()
        {

        }
        public Article(int articleId, string description, string lot, int stock, double price, string brand, string category, int iva)
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
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        [StringLength(50)]
        public string Lot { get; set; }
        [Required]
        public int Stock { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        [StringLength(50)]
        public string Brand { get; set; }
        [Required]
        [StringLength(50)]
        public string Category { get; set; }
        [Required]
        public int Iva { get; set; }
    }
}