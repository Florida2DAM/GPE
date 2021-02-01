using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Articles")]
    public class ArticlesController : ApiController
    {
        // GET: api/Article
        [Route(""), HttpGet]
        public IEnumerable<Article> Get()
        {
            var repo = new ArticlesRepository();
            List<Article> articles = repo.Retrieve();
            return articles;
        }

        // POST: api/Article
        [Route(""), HttpPost]
        public void Post(Article article)
        {
            var repo = new ArticlesRepository();
            repo.Save(article);
        }

        // PUT: api/Article/ID_Number
        [Route(""), HttpPut]
        public void Put(int id)
        {
            var repo = new ArticlesRepository();
            repo.Update(id);
        }

        // PUT: api/Articles/
        [Route("updateState"), HttpPut]
        public void Put([FromBody] Article article)
        {
            var repo = new ArticlesRepository();
            repo.Update(article);
        }
    }
}