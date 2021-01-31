using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class Employee
    {
        public Employee()
        {

        }

        public Employee(int employeeId, string name, string type)
        {
            EmployeeId = employeeId;
            Name = name;
            Type = type;
        }

        public int EmployeeId { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Type { get; set; }
    }
}