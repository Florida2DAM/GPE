using System.Collections.Generic;
using System.Linq;

namespace GPE.Models
{
    public class EmployeesRepository
    {
        GPEContext context = new GPEContext();

        //Show all employees
        internal List<Employee> Retrieve()
        {
            List<Employee> employees = context.Employees
                .Where(e=>e.Enabled)
                .ToList();
            return employees;
        }

        //Add a new employeer
        internal void Save(Employee emp)
        {
            context.Employees.Add(emp);
            context.SaveChanges();
        }
        //Delete user by id
        internal void Delete(int id)
        {
            Employee emp;
            emp = context.Employees.Where(s => s.EmployeeId == id).FirstOrDefault();
            context.Employees.Remove(emp);
            context.SaveChanges();
        }
        //Update an existent user
        internal void Update(int id, Employee eventoBody)
        {
            Employee emp;

            emp = context.Employees.Where(s => s.EmployeeId == id).FirstOrDefault();
            emp.Name = eventoBody.Name;
            emp.Type = eventoBody.Type;
            emp.Enabled = eventoBody.Enabled;
            context.SaveChanges();
        }
    }
}