using System.Collections.Generic;
using System.Web.Http;
using GPE.Models;

namespace GPE.Controllers
{
    public class EmployeeController : ApiController
    {
        // GET: api/Employee
        public IEnumerable<Employee> Get()
        {
            var repo = new EmployeeRepository();
            List<Employee> emp = repo.Retrieve();
            return emp;
        }

        // GET: api/Employee/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Employee
        public void Post([FromBody]Employee emp)
        {
            var repo = new EmployeeRepository();
            repo.Save(emp);

        }

        // PUT: api/Employee/5
        public void Put(int id, [FromBody]Employee emp)
        {
            var repo = new EmployeeRepository();
            repo.Update(id,emp);
        }

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
            var repo = new EmployeeRepository();
            repo.Delete(id);

        }
    }
}
