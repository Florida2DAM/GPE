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

        public Order(int orderId, int clientId, int orderNum, DateTime date, DateTime deliveryDate, string contactName, double total, bool delivered, bool paid, string payingMethod, string deliverer, int employeeId)
        {
            OrderId = orderId;
            ClientId = clientId;
            OrderNum = orderNum;
            Date = date;
            DeliveryDate = deliveryDate;
            ContactName = contactName;
            Total = total;
            Delivered = delivered;
            Paid = paid;
            PayingMethod = payingMethod;
            Deliverer = deliverer;
            EmployeeId = employeeId;
        }

        public int OrderId { get; set; }
        public int ClientId { get; set; }
        [Required]
        public int OrderNum { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public DateTime DeliveryDate { get; set; }
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
        [StringLength(50)]
        [Required]
        public string Deliverer { get; set; }
        public int EmployeeId { get; set; }

        public Client Client { get; set; }
        public Employee Employee { get; set; }
        public List<OrderLine> OrderLines { get; set; }
    }

    public class DeliverOrder {
        public DeliverOrder(int orderId, int clientId, string clientName, string contactName, string address, string city, string postalCode, double total, bool delivered, string deliverer)
        {
            OrderId = orderId;
            ClientId = clientId;
            ClientName = clientName;
            ContactName = contactName;
            Address = address;
            City = city;
            PostalCode = postalCode;
            Total = total;
            Delivered = delivered;
            Deliverer = deliverer;
        }

        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string ContactName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public double Total { get; set; }
        public bool Delivered { get; set; }
        public bool Paid { get; set; }
        public string Deliverer { get; set; }
        public int EmployeeId { get; set; }

        public Client Client { get; set; }
        public Employee Employee { get; set; }
        public List<OrderLine> OrderLines { get; set; }
    }

}