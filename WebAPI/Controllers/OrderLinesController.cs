using System.Collections.Generic;
using System.Web.Http;
using GPE.Models;

namespace GPE.Controllers
{
    [RoutePrefix("api/OrderLines")]
    public class OrderLinesController : ApiController
    {
        // GET api/OrderLines
        public IEnumerable<OrderLine> Get()
        {
            var repo = new OrderLinesRepository();
            List<OrderLine> orderLines = repo.Retrieve();
            return orderLines;
        }

        // GET api/OrderLinesByOrderId
        public IEnumerable<OrderLine> GetByOrderId(int orderId)
        {
            var repo = new OrderLinesRepository();
            List<OrderLine> orderLines = repo.RetrieveByOrder(orderId);
            return orderLines;
        }

        // POST api/OrderLines
        public void Post([FromBody] List<OrderLine> orderLines)
        {
            var repo = new OrderLinesRepository();
            repo.Save(orderLines);
        }

        // PUT api/OrderLines
        public void Put([FromBody] OrderLine orderLine)
        {
            var repo = new OrderLinesRepository();
            repo.Put(orderLine);
        }

        // DELETE api/OrderLines
        public void Delete(int orderId, int lineId)
        {
            var repo = new OrderLinesRepository();
            repo.Delete(orderId, lineId);
        }
    }
}