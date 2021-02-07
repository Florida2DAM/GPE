using Microsoft.EntityFrameworkCore;
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
            order = context.Orders.Include(ol => ol.OrderLines).ToList();
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

       
        private static DeliverOrder DeliverOrder(Order order)
        {
            GPEContext context = new GPEContext();

            Order order1 = context.Orders
                .Include(o => o.Client)
                .FirstOrDefault();

            return new DeliverOrder(order1.OrderId, order1.ClientId, order1.Client.Name, order1.Client.Address, order1.Client.City, order1.Client.PostalCode, order1.ContactName, order1.Total, order1.Delivered, order1.Deliverer);
        }

        internal List<DeliverOrder> RetrieveDelivers()
        {
            List<DeliverOrder> order = context.Orders
                .Select(o => DeliverOrder(o))
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