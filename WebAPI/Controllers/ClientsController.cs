using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Clients")]
    public class ClientsController : ApiController
    {
        ClientsRepository model = new ClientsRepository();

        // GET api/Clients
        public IEnumerable<Client> Get()
        {
            List<Client> clients = model.GetClients();

            return clients;
        }

        // GET api/Clients?name=value
        public IEnumerable<Client> Get(string name)
        {
            List<Client> clients = model.GetClientsByName(name);

            return clients;
        }

        //GET: api/ClientsRegsiter
        [Route("api/GetDates"), HttpGet]
        public IEnumerable<string> GetRegisters()
        {
            List<string> clients = model.GetClientsRegister();
            return clients;
        }

        // GET: api/ClientsCountRegisters
        [Route("api/GetRegisters"), HttpGet]
        public IEnumerable<int> GetCountRegsiters()
        {
            List<int> apuestas = model.RetrieveCountRegisters();
            return apuestas;
        }

        // POST api/Clients
        public void Post([FromBody] Client client)
        {
            model.AddClient(client);
        }

        // PUT api/Clients
        public void Put([FromBody] Client client)
        {
            model.UpdateClient(client);
        }

        // PUT api/Clients/2
        public void Put(int id)
        {
            model.UpdateBlockedClient(id);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

    }
}