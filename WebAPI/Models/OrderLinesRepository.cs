using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class OrderLinesRepository
    {
        /// <summary>
        /// We declare here the GPEContext object which we'll use to charge our tables objects
        /// </summary>
        GPEContext context = new GPEContext();

        /// <summary>
        /// Used for charge all order lines from all orders.
        /// </summary>
        /// <returns>Returns a List of OrderLines</returns>
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

            if (orderL.LotId != orderLine.LotId)
            {
                changeLot(orderLine.LotId, orderL.LotId, orderL.Quantity);
                orderLine.LotId = orderL.LotId;
            }

            if (orderL.Price != orderLine.Price)
            {
                double diff = orderL.Price - orderLine.Price;
                orderLine.Price = orderL.Price;
                changeTotalOrder(order.OrderId, diff);
            }

            if (orderL.Quantity != orderLine.Quantity)
            {
                changeStock(orderL.LotId, orderL.Quantity);
                orderLine.Quantity = orderL.Quantity;
            }

            context.OrderLines.Update(orderLine);
            context.SaveChanges();
        }

        private void changeTotalOrder(int orderId, double difference)
        {
            Order order = context.Orders
               .Where(or => or.OrderId == orderId)
               .FirstOrDefault();

            order.Total += difference;

            context.Orders.Update(order);
            context.SaveChanges();
        }

        private void changeLot(string oldLot, string newLot, int stock)
        {
            Lot lotOld = context.Lots
                .Where(lo => lo.LotId == oldLot)
                .FirstOrDefault();

            Lot lotNew = context.Lots
                .Where(ln => ln.LotId == newLot)
                .FirstOrDefault();

            lotOld.Stock += stock;
            lotNew.Stock -= stock;

            context.Lots.UpdateRange(lotOld, lotNew);
            context.SaveChanges();
        }

        private void changeStock(string lotId, int stock)
        {
            Lot lot = context.Lots
               .Where(l => l.LotId == lotId)
               .FirstOrDefault();

            lot.Stock = stock;

            context.Lots.Update(lot);
            context.SaveChanges();
        }

        internal void Delete (int orderId, int lineId)
        {
            double totalRemove;

            OrderLine orderLine = context.OrderLines
                .Where(o => o.OrderId == orderId && o.LineId == lineId)
                .FirstOrDefault();

            context.OrderLines.Remove(orderLine);
            context.SaveChanges();



            //changeTotalOrder(orderId, or)
        }
    }
}