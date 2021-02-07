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

        public Order(int orderId, int clientId, int orderNum, string name, DateTime date, DateTime deliveryDate, string contactName, string address, string city, string phone, double total, bool delivered, bool paid, string payingMethod, string deliverer, int employeeId)
        {
            OrderId = orderId;
            ClientId = clientId;
            OrderNum = orderNum;
            Name = name;
            Date = date;
            DeliveryDate = deliveryDate;
            ContactName = contactName;
            Address = address;
            City = city;
            Phone = phone;
            Total = total;
            Delivered = delivered;
            Paid = paid;
            PayingMethod = payingMethod;
            Deliverer = deliverer;
            EmployeeId = employeeId;
        }

        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public int OrderNum { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public DateTime DeliveryDate { get; set; }
        [Required]
        [StringLength(50)]
        public string ContactName { get; set; }
        [Required]
        [StringLength(50)]
        public string Address { get; set; }
        [Required]
        [StringLength(50)]
        public string City { get; set; }
        [Required]
        [StringLength(13)]
        public string Phone { get; set; }
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
        public string Deliverer { get; set; }
        public int EmployeeId { get; set; }

        public Client Client { get; set; }
        public Employee Employee { get; set; }
        public List<OrderLine> OrderLines { get; set; }
    }
}