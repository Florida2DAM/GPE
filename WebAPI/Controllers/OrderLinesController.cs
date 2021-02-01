using System.Web.Http;
using GPE.Models;

namespace GPE.Controllers
{
    [RoutePrefix("api/OrderLines")]
    public class OrderLinesController : ApiController
    {
        // PUT api/OrderLines
        public void Put ([FromBody] OrderLine orderLine)
        {
            var repo = new OrderLinesRepository();
            repo.Put(orderLine);
        }
    }
}