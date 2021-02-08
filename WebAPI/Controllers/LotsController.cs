﻿using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Lots")]
    public class LotsController : ApiController
    {
        // GET: api/Lots
        public IEnumerable<Lot> Get()
        {
            var repo = new LotsRepository();
            List<Lot> lot = repo.Retrieve();
            return lot;
        }


        // GET: api/Lots/5
        public IEnumerable<Lot> Get(int ArticleId)
        {
            var repo = new LotsRepository();
            List<Lot> lot = repo.Retrieve(ArticleId);
            return lot;
        }

        // POST: api/Lots
        public void Post([FromBody]Lot lot)
        {

            var repo = new LotsRepository();
            repo.Save(lot);

        }

        // PUT: api/Lots/5

        public void Put([FromBody]Lot lot)
        {
            var repo = new LotsRepository();
            repo.Update(lot);
        }

    }
}