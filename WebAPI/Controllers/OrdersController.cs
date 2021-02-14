using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        OrdersRepository ordersRepository = new OrdersRepository();

        // GET: api/Orders
        public IEnumerable<Order> Get()
        {
            List<Order> orders = ordersRepository.Retrieve();
            return orders;
        }

        // GET: api/Orders/5
        public Order Get(int id)
        {
            Order order = ordersRepository.Retrieve(id);
            return order;
        }

        // GET: 
        [Route("GetLast"), HttpGet]
        public int GetLast()
        {
            return ordersRepository.GetLastOrderId();
        }

        // GET: api/OrdersByEmployeeAndId
        [Route("GetDeliver"), HttpGet]
        public IEnumerable<Order> GetDeliver()
        {
            List<Order> orders = ordersRepository.RetrieveDelivers();
            return orders;
        }
        // GET: api/Orders NumberList
        [Route("NumberList"), HttpGet]
        public List<int> NumberList()
        {
            List<int> numList = ordersRepository.RetrieveCountAltas();
            return numList;
        }

        // POST: api/Orders
        public void Post([FromBody] Order order)
        {
            ordersRepository.Save(order);
        }

        // PUT: api/Orders/5
        public void Put([FromBody] Order order)
        {
            ordersRepository.Update(order);
        }

        // PUT: api/Orders/5
        [Route("Deliver"), HttpPut]
        public void PutDeliver(int orderId, double paid, string payingMethod)
        {
            ordersRepository.UpdateDeliver(orderId, paid, payingMethod);
        }

        // PUT: api/Article/ID
        [Route(""), HttpPut]
        public void Put(int id)
        {
            var repo = new OrdersRepository();
            repo.UpdateDelivered(id);
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
            ordersRepository.Delete(id);
        }

        
    }
}
