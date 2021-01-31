using Microsoft.EntityFrameworkCore;
using System;

namespace GPE.Models
{
    public class GPEContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
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

            // Tabla Employees
            modelBuilder.Entity<Employee>().HasData(new Employee(1, "Jesus", "Repartidor"));

            // Tabla Clients
            modelBuilder.Entity<Client>().HasData(new Client(1, "Wei", "Su casa", "Valencia", "46400", "Valencia", "Españita", "666555444", "emailflamote@gmail.com", "20945677-A", "Tu madre"));

            // Tabla Orders
            modelBuilder.Entity<Order>().HasData(new Order(1,1,1, Convert.ToDateTime("2021-02-01 00:00:00"), Convert.ToDateTime("2021-02-02 00:00:00"), "Miguel", 1938.98, false, false, "Cash", 1));

            // Tabla OrderLines
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(1,1,1,"Lot-01","PrimerArticuloToFlama", 10.5, "MarcaBuena", "RialOne", 15, 21, 0));
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(2, 1, 1, "Lot-01", "PrimerArticuloToFlama", 10.5, "MarcaBuena", "RialOne", 25, 21, 10));
        }
    }
}