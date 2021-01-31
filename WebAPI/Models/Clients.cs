using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Clients
    {
        public Clients()
        {
        }
        public Clients(int clientId, string client, string address, string city, string postalCode, string province, string country, string phone, string email, string nIF, string contactName)
        {
            ClientId = clientId;
            Client = client;
            Address = address;
            City = city;
            PostalCode = postalCode;
            Province = province;
            Country = country;
            Phone = phone;
            Email = email;
            NIF = nIF;
            ContactName = contactName;
        }

        public int ClientId { get; set; }
        public string Client { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string NIF { get; set; }
        public string ContactName { get; set; }

        public List<Orders> Orders { get; set; }
    }
}