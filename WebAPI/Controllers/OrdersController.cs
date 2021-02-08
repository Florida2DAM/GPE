using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        OrdersRepository repo = new OrdersRepository();

        // GET: api/Orders
        public IEnumerable<Order> Get()
        {
            List<Order> orders = repo.Retrieve();
            return orders;
        }

        // GET: api/Orders/5
        public Order Get(int id)
        {
            Order order = repo.Retrieve(id);
            return order;
        }

        // GET: api/OrdersByEmployeeAndId
        [Route("GetDeliver"), HttpGet]
        public IEnumerable<Order> GetDeliver()
        {
            List<Order> orders = repo.RetrieveDelivers();
            return orders;
        }

        // POST: api/Orders
        public void Post([FromBody] Order order)
        {
            repo.Save(order);
        }

        // PUT: api/Orders/5
        public void Put([FromBody] Order order)
        {
            repo.Update(order);
        }

        // PUT: api/Orders/5
        [Route("Deliver"), HttpPut]
        public void Put(int orderId, double paid, string payingMethod)
        {
            repo.UpdateDeliver(orderId, paid, payingMethod);
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
            repo.Delete(id);
        }
    }
}
