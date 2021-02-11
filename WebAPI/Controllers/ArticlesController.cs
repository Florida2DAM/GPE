using GPE.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace GPE.Controllers
{
    [RoutePrefix("api/Articles")]
    public class ArticlesController : ApiController
    {
        ArticlesRepository articlesRepository = new ArticlesRepository();

        // GET: api/Article
        public IEnumerable<Article> Get()
        {
            List<Article> articles = articlesRepository.Retrieve();
            return articles;
        }

        // GET: api/Article
        public Article Get(int articleId)
        {
            Article article = articlesRepository.Retrieve(articleId);
            return article;
        }

        // POST: api/Article
        public void Post(Article article)
        {
            articlesRepository.Save(article);
        }

        // PUT: api/Article/ID_Number
        public void Put(int id)
        {
            articlesRepository.Update(id);
        }

        // PUT: api/Articles/
        public void Put([FromBody] Article article)
        {
            articlesRepository.Update(article);
        }
    }
}