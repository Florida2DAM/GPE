using System.Collections.Generic;
using System.Web.Http;
using GPE.Models;

namespace GPE.Controllers
{
    [RoutePrefix("api/Employees")]
    public class EmployeesController : ApiController
    {
        EmployeesRepository employeesRepository = new EmployeesRepository();
        // GET: api/Employee
        public IEnumerable<Employee> Get()
        {
            List<Employee> emp = employeesRepository.Retrieve();
            return emp;
        }

        // POST: api/Employee
        public void Post([FromBody]Employee emp)
        {
            employeesRepository.Save(emp);
        }

        // PUT: api/Employee/5
        public void Put(int id, [FromBody]Employee emp)
        {
            employeesRepository.Update(id,emp);
        }

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
            employeesRepository.Delete(id);
        }
    }
}
