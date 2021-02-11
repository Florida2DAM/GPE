﻿using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Clients")]
    public class ClientsController : ApiController
    {
        ClientsRepository clientsRepository = new ClientsRepository();

        // GET api/Clients
        public IEnumerable<Client> Get()
        {
            List<Client> clients = clientsRepository.GetClients();
            return clients;
        }

        // GET api/Clients?name=value
        public IEnumerable<Client> Get(string name)
        {
            List<Client> clients = clientsRepository.GetClientsByName(name);
            return clients;
        }

        // GET api/Clients?clientId=value
        public Client Get(int clientId)
        {
            Client client = clientsRepository.GetClientById(clientId);
            return client;
        }

        //GET: api/ClientsRegsiter
        [Route("api/GetDates"), HttpGet]
        public IEnumerable<string> GetRegisters()
        {
            List<string> clients = clientsRepository.GetClientsRegister();
            return clients;
        }

        // GET: api/ClientsCountRegisters
        [Route("api/GetRegisters"), HttpGet]
        public IEnumerable<int> GetCountRegsiters()
        {
            List<int> apuestas = clientsRepository.RetrieveCountRegisters();
            return apuestas;
        }

        // POST api/Clients
        public void Post([FromBody] Client client)
        {
            clientsRepository.AddClient(client);
        }

        // PUT api/Clients
        public void Put([FromBody] Client client)
        {
            clientsRepository.UpdateClient(client);
        }

        // PUT api/Clients/2
        public void Put(int id)
        {
            clientsRepository.UpdateBlockedClient(id);
        }
    }
}