using Microsoft.EntityFrameworkCore;
using System;

namespace GPE.Models
{
    public class GPEContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Lot> Lots { get; set; }
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
            // We declare the double key for the OrderLines table, who needs the PK from Orders table and it's own PK
            modelBuilder.Entity<OrderLine>().HasKey(c => new { c.OrderId, c.LineId });

            // We declare the double key for the Lot table, who needs the PK from Article table and it's own PK
            modelBuilder.Entity<Lot>().HasKey(l => new { l.ArticleId, l.LotId });

            // Table Articles
            modelBuilder.Entity<Article>().HasData(new Article(1, "PrimerArticuloToFlama", 10.5, "MarcaBuena", "RialOne", 21));
            modelBuilder.Entity<Article>().HasData(new Article(2, "SegundoArticuloToFlama", 15.5, "MarcaMala", "RialOne", 4));

            // Table Lots
            modelBuilder.Entity<Lot>().HasData(new Lot(1, "Lote-01", 500));
            modelBuilder.Entity<Lot>().HasData(new Lot(1, "Lote-02", 200));
            modelBuilder.Entity<Lot>().HasData(new Lot(2, "Lote-02", 1000));

            // Tabla Employees
            modelBuilder.Entity<Employee>().HasData(new Employee(1, "Jesus", "Deliverer", true));
            modelBuilder.Entity<Employee>().HasData(new Employee(2, "Miguel", "Comercial", true));

            // Tabla Clients
            modelBuilder.Entity<Client>().HasData(new Client(1, "Wei", "Su casa", "Valencia", "46400", "Valencia", "Españita", "666555444", "emailflamote@gmail.com", "20945677-A", "Su madre", Convert.ToDateTime("2011-01-01 00:00:00"), true));
            modelBuilder.Entity<Client>().HasData(new Client(2, "Damia", "Mi casa", "Cullera", "46400", "Valencia", "Españita", "666555444", "emaildamia@gmail.com", "11122233-B", "Antonia josefa estafania aurelia", Convert.ToDateTime("2011-01-01 00:00:00"), true));

            // Tabla Orders
            modelBuilder.Entity<Order>().HasData(new Order(1, 1, 1, Convert.ToDateTime("2021-02-01 00:00:00"), Convert.ToDateTime("2021-02-02 00:00:00"), "Wei", 1938.98, false, false, "Cash", "Jesus", 2));
            modelBuilder.Entity<Order>().HasData(new Order(2, 2, 2, Convert.ToDateTime("2021-02-02 00:00:00"), Convert.ToDateTime("2021-02-03 00:00:00"), "Damia", 2000.98, false, false, "Cash", "Jesus" , 2));

            // Tabla OrderLines
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(1, 1, 1, "Lote-01", "PrimerArticuloToFlama", 10.5, "MarcaBuena", "RialOne", 15, 21, 0, 190.58));
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(1, 2, 1, "Lote-01", "PrimerArticuloToFlama", 10.5, "MarcaBuena", "RialOne", 25, 21, 10, 285.86));
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(2, 1, 2, "Lote-02", "PrimerArticuloToFlama", 15.5, "MarcaBuena", "RialOne", 15, 4, 0, 281.33));
            modelBuilder.Entity<OrderLine>().HasData(new OrderLine(2, 2, 2, "Lote-02", "PrimerArticuloToFlama", 15.5, "MarcaBuena", "RialOne", 25, 4, 10, 450.12));
        }
    }
}