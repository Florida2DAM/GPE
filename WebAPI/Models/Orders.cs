using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Orders
    {
        public int OrderId { get; set; }
        public string ClientId { get; set; }
        public int OrderNum { get; set; }
        public DateTime Date { get; set; }
        public DateTime DeriveryDate { get; set; }
        public string ContactName { get; set; }
        public double Total { get; set; }
        public bool Delivered { get; set; }
        public bool Paid { get; set; }
        public string PayingMethod { get; set; }
        public string Employee { get; set; }

    }
}