using System.ComponentModel.DataAnnotations;

namespace GPE.Models
{
    public class Article
    {
        public Article()
        {

        }

        public Article(int articleId, string description, double price, string brand, string category, int iva)
        {
            ArticleId = articleId;
            Description = description;
            Price = price;
            Brand = brand;
            Category = category;
            Iva = iva;
        }

        public int ArticleId { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        public double Price { get; set; }
        [Required]
        [StringLength(50)]
        public string Brand { get; set; }
        [Required]
        [StringLength(50)]
        public string Category { get; set; }
        [Required]
        public int Iva { get; set; }
        [Required]
        public bool Enabled { get; set; }
    }
}