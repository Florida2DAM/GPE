using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class ClientsRepository
    {

        /// <summary>
        /// Defining context for interactions with database
        /// </summary>
        GPEContext context = new GPEContext();

        internal List<Client> GetClients()
        {
            List<Client> clients = new List<Client>();
            clients = context.Clients.ToList();  

            return clients;
        }

        internal void AddClient(Client c)
        {
            context.Clients.Add(c);
            context.SaveChanges();
        }

        internal List<Client> GetClientsByName(String n)
        {
            List<Client> clients = new List<Client>();

            clients = context.Clients
                    .Where(c => c.Name == (n))
                    .ToList();

            return clients;
        }

        internal List<string> GetClientsRegister()
        {
            List<string> dates = new List<string>();

            dates = context.Clients
                .DistinctBy(f => f.RegisterDate.ToShortDateString())
                .Select(f => f.RegisterDate.ToShortDateString())
                .ToList();

            return dates;
        }

        internal List<int> RetrieveCountRegisters()
        {
            List<int> countRegisters = new List<int>();
            List<string> datesDistinct = GetClientsRegister();
            List<string> datesAll = context.Clients
                .Select(f => f.RegisterDate.ToShortDateString())
                .ToList();

            foreach (string fecha in datesDistinct)
            {
                int count = datesAll.Count(f => f == fecha);
                countRegisters.Add(count);
            }

            return countRegisters;
        }

        //Updates where new id = old id
        internal void UpdateClient(Client c)
        {
            context.Clients.Update(c);
            context.SaveChanges();
        }

        internal void UpdateBlockedClient(int id)
        {
            Client client = context.Clients.Find(id);
            client.Enabled = !client.Enabled;
            context.Clients.Update(client);
            context.SaveChanges();
        }
    }

}