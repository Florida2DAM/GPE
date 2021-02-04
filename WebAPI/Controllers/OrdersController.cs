using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        // GET: api/Orders
        public IEnumerable<Order> Get()
        {
            var repo = new OrdersRepository();
            List<Order> orders = repo.Retrieve();
            return orders;

        }

        // GET: api/Orders/5
        public Order Get(int id)
        {
            var repo = new OrdersRepository();
            Order order = repo.Retrieve(id);
            return order;
        }

        // POST: api/Orders
        public void Post([FromBody] Order order)
        {
            var repo = new OrdersRepository();
            repo.Save(order);
        }

        // PUT: api/Orders/5
        public void Put([FromBody] Order order)
        {
            var repo = new OrdersRepository();
            repo.Update(order);
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
            var repo = new OrdersRepository();
            repo.Delete(id);
        }
    }
}
