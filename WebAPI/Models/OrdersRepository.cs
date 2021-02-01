using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class OrdersRepository
    {
        public GPEContext context = new GPEContext();
        /// <summary>
        /// get a list of orders
        /// </summary>
        /// <returns></returns>
        internal List<Order> Retrieve()
        {
            List<Order> order = new List<Order>();
            using (GPEContext context = new GPEContext())
            {
                order = context.Orders.Include(ol => ol.OrderLines).ToList();
            }
            return order;
        }
        /// <summary>
        /// get a order by id
        /// </summary>
        /// <returns></returns>
        internal Order Retrieve(int id)
        {
            Order order;
            using (GPEContext context = new GPEContext())
            {
                order = context.Orders.Where(o => o.OrderId == id).FirstOrDefault();
            }
            return order;
        }
        /// <summary>
        /// add a order
        /// </summary>
        /// <param name="order"></param>
        internal void Save(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
        /// <summary>
        /// update a order by a id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="order"></param>
        internal void Update(int id, Order order)
        {
            Order order1;
            order1 = context.Orders.Where(o => (o.OrderId == id)).FirstOrDefault();
            order1.ClientId = order.ClientId;
            order1.OrderNum = order.OrderNum;
            order1.Date = order.Date;
            order1.Delivered = order.Delivered;
            order1.ContactName = order.ContactName;
            order1.Total = order.Total;
            order1.Delivered = order.Delivered;
            order1.Paid = order.Paid;
            order1.PayingMethod = order.PayingMethod;
            order1.EmployeeId = order.EmployeeId;
            context.Orders.Update(order1);
            context.SaveChanges();
        }

        internal void Delete(int id)
        {
            Order order = Retrieve(id);
            context.Orders.Remove(order);
            context.SaveChanges();
        }
    }
}