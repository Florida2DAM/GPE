﻿// <auto-generated />
using System;
using GPE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GPE.Migrations
{
    [DbContext(typeof(GPEContext))]
    [Migration("20210203195157_gpe1")]
    partial class gpe1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("GPE.Models.Article", b =>
                {
                    b.Property<int>("ArticleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(100) CHARACTER SET utf8mb4")
                        .HasMaxLength(100);

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<double>("Iva")
                        .HasColumnType("double");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.HasKey("ArticleId");

                    b.ToTable("Articles");

                    b.HasData(
                        new
                        {
                            ArticleId = 1,
                            Brand = "MarcaBuena",
                            Category = "RialOne",
                            Description = "PrimerArticuloToFlama",
                            Enabled = false,
                            Iva = 21.0,
                            Price = 10.5
                        },
                        new
                        {
                            ArticleId = 2,
                            Brand = "MarcaMala",
                            Category = "RialOne",
                            Description = "SegundoArticuloToFlama",
                            Enabled = false,
                            Iva = 4.0,
                            Price = 15.5
                        });
                });

            modelBuilder.Entity("GPE.Models.Client", b =>
                {
                    b.Property<int>("ClientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("varchar(100) CHARACTER SET utf8mb4")
                        .HasMaxLength(100);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("ContactName")
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("NIF")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("varchar(13) CHARACTER SET utf8mb4")
                        .HasMaxLength(13);

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("varchar(5) CHARACTER SET utf8mb4")
                        .HasMaxLength(5);

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<DateTime>("RegisterDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("ClientId");

                    b.ToTable("Clients");

                    b.HasData(
                        new
                        {
                            ClientId = 1,
                            Address = "Su casa",
                            City = "Valencia",
                            ContactName = "Su madre",
                            Country = "Españita",
                            Email = "emailflamote@gmail.com",
                            Enabled = true,
                            NIF = "20945677-A",
                            Name = "Wei",
                            Phone = "666555444",
                            PostalCode = "46400",
                            Province = "Valencia",
                            RegisterDate = new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            ClientId = 2,
                            Address = "Mi casa",
                            City = "Cullera",
                            ContactName = "Antonia josefa estafania aurelia",
                            Country = "Españita",
                            Email = "emaildamia@gmail.com",
                            Enabled = true,
                            NIF = "11122233-B",
                            Name = "Damia",
                            Phone = "666555444",
                            PostalCode = "46400",
                            Province = "Valencia",
                            RegisterDate = new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("GPE.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees");

                    b.HasData(
                        new
                        {
                            EmployeeId = 1,
                            Enabled = false,
                            Name = "Jesus",
                            Type = "Deliverer"
                        },
                        new
                        {
                            EmployeeId = 2,
                            Enabled = false,
                            Name = "Miguel",
                            Type = "Comercial"
                        });
                });

            modelBuilder.Entity("GPE.Models.Lot", b =>
                {
                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("LotId")
                        .HasColumnType("varchar(30) CHARACTER SET utf8mb4")
                        .HasMaxLength(30);

                    b.Property<int>("Stock")
                        .HasColumnType("int");

                    b.HasKey("ArticleId", "LotId");

                    b.ToTable("Lots");

                    b.HasData(
                        new
                        {
                            ArticleId = 1,
                            LotId = "Lote-01",
                            Stock = 500
                        },
                        new
                        {
                            ArticleId = 1,
                            LotId = "Lote-02",
                            Stock = 200
                        },
                        new
                        {
                            ArticleId = 2,
                            LotId = "Lote-02",
                            Stock = 1000
                        });
                });

            modelBuilder.Entity("GPE.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ClientId")
                        .HasColumnType("int");

                    b.Property<string>("ContactName")
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Delivered")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("DeriveryDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<int>("OrderNum")
                        .HasColumnType("int");

                    b.Property<bool>("Paid")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("PayingMethod")
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<double>("Total")
                        .HasColumnType("double");

                    b.HasKey("OrderId");

                    b.HasIndex("ClientId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            OrderId = 1,
                            ClientId = 1,
                            ContactName = "Wei",
                            Date = new DateTime(2021, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Delivered = false,
                            DeriveryDate = new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EmployeeId = 1,
                            OrderNum = 1,
                            Paid = false,
                            PayingMethod = "Cash",
                            Total = 1938.98
                        },
                        new
                        {
                            OrderId = 2,
                            ClientId = 2,
                            ContactName = "Damia",
                            Date = new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Delivered = false,
                            DeriveryDate = new DateTime(2021, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EmployeeId = 1,
                            OrderNum = 2,
                            Paid = false,
                            PayingMethod = "Cash",
                            Total = 2000.98
                        });
                });

            modelBuilder.Entity("GPE.Models.OrderLine", b =>
                {
                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("LineId")
                        .HasColumnType("int");

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(150) CHARACTER SET utf8mb4")
                        .HasMaxLength(150);

                    b.Property<double>("Discount")
                        .HasColumnType("double");

                    b.Property<double>("Iva")
                        .HasColumnType("double");

                    b.Property<string>("LotId")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<double>("TotalLine")
                        .HasColumnType("double");

                    b.HasKey("OrderId", "LineId");

                    b.HasIndex("ArticleId");

                    b.ToTable("OrderLines");

                    b.HasData(
                        new
                        {
                            OrderId = 1,
                            LineId = 1,
                            ArticleId = 1,
                            Brand = "MarcaBuena",
                            Category = "RialOne",
                            Description = "PrimerArticuloToFlama",
                            Discount = 0.0,
                            Iva = 21.0,
                            LotId = "Lote-01",
                            Price = 10.5,
                            Quantity = 15,
                            TotalLine = 190.58000000000001
                        },
                        new
                        {
                            OrderId = 1,
                            LineId = 2,
                            ArticleId = 1,
                            Brand = "MarcaBuena",
                            Category = "RialOne",
                            Description = "PrimerArticuloToFlama",
                            Discount = 10.0,
                            Iva = 21.0,
                            LotId = "Lote-01",
                            Price = 10.5,
                            Quantity = 25,
                            TotalLine = 285.86000000000001
                        },
                        new
                        {
                            OrderId = 2,
                            LineId = 1,
                            ArticleId = 2,
                            Brand = "MarcaBuena",
                            Category = "RialOne",
                            Description = "PrimerArticuloToFlama",
                            Discount = 0.0,
                            Iva = 4.0,
                            LotId = "Lote-02",
                            Price = 15.5,
                            Quantity = 15,
                            TotalLine = 281.32999999999998
                        },
                        new
                        {
                            OrderId = 2,
                            LineId = 2,
                            ArticleId = 2,
                            Brand = "MarcaBuena",
                            Category = "RialOne",
                            Description = "PrimerArticuloToFlama",
                            Discount = 10.0,
                            Iva = 4.0,
                            LotId = "Lote-02",
                            Price = 15.5,
                            Quantity = 25,
                            TotalLine = 450.12
                        });
                });

            modelBuilder.Entity("GPE.Models.Lot", b =>
                {
                    b.HasOne("GPE.Models.Article", "Article")
                        .WithMany("Lots")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GPE.Models.Order", b =>
                {
                    b.HasOne("GPE.Models.Client", "Client")
                        .WithMany("Orders")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GPE.Models.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GPE.Models.OrderLine", b =>
                {
                    b.HasOne("GPE.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GPE.Models.Order", "Order")
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
