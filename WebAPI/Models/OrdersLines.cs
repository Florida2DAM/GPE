using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class OrdersLines
    {
        public int OrderId { get; set; }
        public string LineId { get; set; }
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


    }
}