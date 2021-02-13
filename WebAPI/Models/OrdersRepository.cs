using Microsoft.Ajax.Utilities;
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
                .Where(o => o.Delivered == false)
                .ToList();

            return order;
        }

    
        internal List<string> RetrieveDiasAltas()
        {
            List<DateTime> fechaDateTime = new List<DateTime>();
            List<string> fecha = new List<string>();

            fecha = context.Orders
                .DistinctBy(o => o.Date.ToShortDateString())
                .Select(f => f.Date.ToShortDateString())
                .ToList();

            return fecha;
        }

        //Obtener nº de altas por dia
        internal List<int> RetrieveCountAltas()
        {
            List<int> countAltas = new List<int>();
            List<string> fechasDistinct = RetrieveDiasAltas();
            List<string> fechasAll = context.Orders
                .Select(f => f.Date.ToShortDateString())
                .ToList();

            foreach (string fecha in fechasDistinct)
            {
                int count = fechasAll.Count(f => f == fecha);
                countAltas.Add(count);
            }

            return countAltas;
        }

        /// <summary>
        /// add a order
        /// </summary>
        /// <param name="order"></param>
        internal void Save(Order order)
        {
            order.Date = DateTime.Now;
            order.OrderNum = NextOrderNum();

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

        /// <summary>
        /// Method used to asign the orderLines' orderId
        /// </summary>
        /// <returns></returns>
        internal int GetLastOrderId()
        {
            Order order = Retrieve()
                .LastOrDefault();

            return order.OrderId;
        }

        /// <summary>
        /// Method used to asing the new OrderNum to the newOrders
        /// </summary>
        /// <returns></returns>
        private string NextOrderNum()
        {
            Order order = Retrieve()
                .LastOrDefault();

            string year = DateTime.Now.Year.ToString();
            int newId = order.OrderId;
            newId++;
            string nextNum = year + "/" + newId.ToString("D5");

            return nextNum;
        }
    }
}