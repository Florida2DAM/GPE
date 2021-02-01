using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GPE.Models
{
    public class LotsRepository
    {
        internal List<Lot> Retrieve()
        {
            List<Lot> lots = new List<Lot>();
            using (GPEContext context = new GPEContext())
            {
                lots = context.Lots.ToList();
            }
            return lots;
        }

        internal void Save(Lot lot)
        {
            using (GPEContext context = new GPEContext())
            {
                context.Lots.Add(lot);
                context.SaveChanges();

            }
        }

        internal void Update(int articleId, string lotId, Lot lot)
        {

            Lot lot1;
            GPEContext context = new GPEContext();
           
            lot1 = context.Lots.Where(a => (a.ArticleId == articleId && a.LotId==lotId)).FirstOrDefault();
            lot1.Stock = lot.Stock;
            context.Lots.Update(lot1);
            context.SaveChanges();

        }

    }
}