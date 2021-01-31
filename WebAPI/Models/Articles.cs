using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Articles
    {
        public int ArticleId { get; set; }
        public string Description { get; set; }
        public string Lot { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Iva { get; set; }

    
    }
}