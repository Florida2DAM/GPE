using System.Collections.Generic;
using System.Linq;

namespace GPE.Models
{
    public class ArticlesRepository
    {
        GPEContext context = new GPEContext();

        /// <summary>
        /// Gives every database article
        /// </summary>
        /// <returns>List of articles</returns>
        internal List<Article> Retrieve()
        {
            List<Article> articles = new List<Article>();
            articles = context.Articles.ToList();
            return articles;
        }

        /// <summary>
        /// Gives the article with the indicated id
        /// </summary>
        /// <param name="id">Article id from the article the user wants to get</param>
        /// <returns>An article</returns>
        internal Article Retrieve(int id)
        {
            Article article;
            article = context.Articles.Where(a => a.ArticleId == id).FirstOrDefault();
            return article;
        }

        /// <summary>
        /// Creates a new article in the database
        /// </summary>
        /// <param name="article">The article to add</param>
        internal void Save(Article article)
        {
            context.Articles.Add(article);
            context.SaveChanges();
        }

        /// <summary>
        /// Changes all article values given another article
        /// </summary>
        /// <param name="article">The article to replace the old one</param>
        internal void Update(Article article)
        {
            context.Articles.Update(article);
            context.SaveChanges();
        }

        /// <summary>
        /// Changes the article enabled option to the oposite value
        /// </summary>
        /// <param name="id">The id from the article to update</param>
        internal void Update(int id)
        {
            Article article = Retrieve(id);
            article.Enabled = !article.Enabled;

            context.Articles.Update(article);
            context.SaveChanges();
        }
    }
}