using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPE.Models
{
    public class Lot
    {
        public Lot()
        {

        }

        public Lot(int articleId, int lotId, int stock)
        {
            ArticleId = articleId;
            LotId = lotId;
            Stock = stock;
        }

        [Key, Column(Order = 0)]
        public int ArticleId { get; set; }
        [Key, Column(Order = 1)]
        public int LotId { get; set; }
        [Required]
        public int Stock { get; set; }

        public Article Article { get; set; }
    }
}