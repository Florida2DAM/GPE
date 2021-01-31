using Microsoft.EntityFrameworkCore;
using System;

namespace GPE.Models
{
    public class GPEContext : DbContext
    {
        public DbSet<Article> Article { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderLines> OrderLines { get; set; }
        public GPEContext()
        {

        }

        public GPEContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=127.0.0.1;" +
                                        "Port=3306;" +
                                        "Database=GPE;" +
                                        "Uid=root;" +
                                        "Pwd='';" +
                                        "Convert Zero Datetime=True;" +
                                        "SslMode=none");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tabla Articles
            modelBuilder.Entity<Article>().HasData(new Article(1, "PrimerArticuloToFlama", "Lot-01", 1000, 10.5, "MarcaBuena", "RialOne", 21));


            // Tabla Clients
            modelBuilder.Entity<Client>().HasData(new Client(1, "Wei", "Su casa", "Valencia", "46400", "Valencia", "Españita", "666555444", "emailflamote@gmail.com", "20945677-A", "Tu madre"));

            // Tabla Employees
            modelBuilder.Entity<Employee>().HasData(new Employee(1, "Jesus", "Repartidor"));

            // Tabla Orders
            
            // Tabla OrderLines

        }
    }
}