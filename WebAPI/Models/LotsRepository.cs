using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class LotsRepository
    {
        GPEContext context = new GPEContext();
        /// <summary>
        /// get a list of lots
        /// </summary>
        /// <returns></returns>
        internal List<Lot> Retrieve()
        {
            List<Lot> lots = new List<Lot>();
            lots = context.Lots.ToList();
            return lots;
        }
        /// <summary>
        ///  use for add new lot
        /// </summary>
        /// <param name="lot"></param>
        internal void Save(Lot lot)
        {
            context.Lots.Add(lot);
            context.SaveChanges();
        }

       /// <summary>
       /// use for update stock of lot
       /// </summary>
       /// <param name="lot"></param>
        internal void Update( Lot lot)
        {
            Lot lot1;
            lot1 = context.Lots.Where(a => (a.ArticleId == lot.ArticleId && a.LotId == lot.LotId)).FirstOrDefault();
            lot1.Stock = lot.Stock;
            context.Lots.Update(lot1);
            context.SaveChanges();
        }

    }
}