using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GPE.Models
{
    public class OrdersRepository
    {
        GPEContext context = new GPEContext();
        /// <summary>
        /// get a list of orders
        /// </summary>
        /// <returns></returns>
        internal List<Order> Retrieve()
        {
            List<Order> order = new List<Order>();
            order = context.Orders
                .Include(ol => ol.OrderLines)
                .Include(cl => cl.Client)
                .Include(em => em.Employee)
                .ToList();
            return order;
        }

        /// <summary>
        /// get a order by id
        /// </summary>
        /// <returns></returns>
        internal Order Retrieve(int id)
        {
            Order order;
            order = context.Orders.Where(o => o.OrderId == id).FirstOrDefault();
            return order;
        }

        internal List<Order> RetrieveDelivers()
        {
            List<Order> order = context.Orders
                .Include(ol => ol.OrderLines)
                .Include(cl => cl.Client)
                .Include(em => em.Employee)
                .Where(o => o.Delivered == false)
                .ToList();

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
        /// update a list
        /// </summary>
        /// <param name="order"></param>
        internal void Update(Order order)
        {
            context.Orders.Update(order);
            context.SaveChanges();
        }

        /// <summary>
        /// Update from device when our deliver had delivered the order
        /// </summary>
        /// <param name="order"></param>
        internal void UpdateDeliver(int orderId, double paid, string payingMethod)
        {
            Order order = Retrieve(orderId);

            order.Delivered = true;
            order.Paid = paid;
            order.PayingMethod = payingMethod;
            order.DeliveryDate = DateTime.Now;

            context.Orders.Update(order);
            context.SaveChanges();
        }

        /// <summary>
        /// delete a order by id
        /// </summary>
        /// <param name="id"></param>
        internal void Delete(int id)
        {
            Order order = Retrieve(id);
            context.Orders.Remove(order);
            context.SaveChanges();
        }
    }
}