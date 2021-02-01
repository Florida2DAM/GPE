using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class OrderLinesRepository
    {
        // We declare here the GPEContext object which we'll use to charge our tables objects
        GPEContext context = new GPEContext();

        // Generic method to charge all order lines from DB
        internal List<OrderLine> Retrieve()
        {
            List<OrderLine> orderLines = context.OrderLines
                .ToList();

            return orderLines;
        }

        /// <summary>
        /// Used for charge all order lines depending of the orderID from DB
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns>Returns a List of OrderLines</returns>
        internal List<OrderLine> RetrieveByOrder(int orderId)
        {
            List<OrderLine> orderLines = context.OrderLines
                .Where(o => o.OrderId == orderId)
                .ToList();

            return orderLines;
        }

        /// <summary>
        /// Used for save a OrderLine
        /// </summary>
        /// <param name="orderL">This method needs the OrderLine object for save</param>
        internal void Save(OrderLine orderL)
        {
            context.OrderLines.Add(orderL);
            context.SaveChanges();
        }

        internal void Put(OrderLine orderL)
        {
            OrderLine orderLine = context.OrderLines
                .Where(o => o.OrderId == orderL.OrderId && o.LineId == orderL.LineId)
                .FirstOrDefault();

            Order order = context.Orders
                .Where(or => or.OrderId == orderL.OrderId)
                .FirstOrDefault();
        }
    }
}