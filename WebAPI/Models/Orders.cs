using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Orders
    {
        public Orders()
        {

        }
        public Orders(int orderId, int clientId, int orderNum, DateTime date, DateTime deriveryDate, string contactName, double total, bool delivered, bool paid, string payingMethod, int employeeId)
        {
            OrderId = orderId;
            ClientId = clientId;
            OrderNum = orderNum;
            Date = date;
            DeriveryDate = deriveryDate;
            ContactName = contactName;
            Total = total;
            Delivered = delivered;
            Paid = paid;
            PayingMethod = payingMethod;
            EmployeeId = employeeId;
        }

        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public int OrderNum { get; set; }
        public DateTime Date { get; set; }
        public DateTime DeriveryDate { get; set; }
        public string ContactName { get; set; }
        public double Total { get; set; }
        public bool Delivered { get; set; }
        public bool Paid { get; set; }
        public string PayingMethod { get; set; }
        public int EmployeeId { get; set; }

        public Clients Clients { get; set; }
        public Employees Employees { get; set; }
        public List<OrdersLines> OrdersLines { get; set; }
    }
}