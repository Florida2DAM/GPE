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

        public Order(int orderId, int clientId, int orderNum, DateTime date, DateTime deliveryDate, double total, bool delivered, bool paid, string payingMethod, int employeeId)
        {
            OrderId = orderId;
            ClientId = clientId;
            OrderNum = orderNum;
            Date = date;
            DeliveryDate = deliveryDate;
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
        [Required]
        public DateTime DeliveryDate { get; set; }
        [Required]
        public double Total { get; set; }
        [Required]
        public bool Delivered { get; set; }
        [Required]
        public bool Paid { get; set; }
        [StringLength(50)]
        public string PayingMethod { get; set; }
        [StringLength(50)]
        [Required]
        public int EmployeeId { get; set; }

        public Client Client { get; set; }
        public Employee Employee { get; set; }
        public List<OrderLine> OrderLines { get; set; }
    }
}