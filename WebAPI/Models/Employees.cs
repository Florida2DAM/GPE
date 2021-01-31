using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Employees
    {
        public Employees()
        {

        }
        public Employees(int employeeId, string employee, string type)
        {
            EmployeeId = employeeId;
            Employee = employee;
            Type = type;
        }

        public int EmployeeId { get; set; }
        public string Employee { get; set; }
        public string Type { get; set; }
    }
}