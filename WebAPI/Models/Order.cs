using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GPE.Models
{
    public class Order
    {
        public Order()
        {

        }
        public Order(int orderId, int clientId, int orderNum, DateTime date, DateTime deriveryDate, string contactName, double total, bool delivered, bool paid, string payingMethod, int employeeId)
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

        [Key]
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

        public Client Clients { get; set; }
        public Employee Employees { get; set; }
        public List<OrderLines> OrdersLines { get; set; }
    }
}