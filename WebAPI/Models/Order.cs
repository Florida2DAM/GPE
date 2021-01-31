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
        [Required]
        public int OrderNum { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public DateTime DeriveryDate { get; set; }
        [StringLength(50)]
        public string ContactName { get; set; }
        [Required]
        public double Total { get; set; }
        [Required]
        public bool Delivered { get; set; }
        [Required]
        public bool Paid { get; set; }
        [StringLength(50)]
        public string PayingMethod { get; set; }
        public int EmployeeId { get; set; }

        public Client Client { get; set; }
        public Employee Employee { get; set; }
        public List<OrderLine> OrderLines { get; set; }
    }
}