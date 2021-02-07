using System.Collections.Generic;
using System.Linq;

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


        internal List<Lot> Retrieve(int ArticleId)
        {
            List<Lot> lots = new List<Lot>();
            lots = context.Lots.Where(l=>l.ArticleId==ArticleId).ToList();
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
            context.Lots.Update(lot);
            context.SaveChanges();
        }

    }
}