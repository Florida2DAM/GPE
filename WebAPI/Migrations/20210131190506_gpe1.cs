﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GPE.Migrations
{
    public partial class gpe1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: false),
                    City = table.Column<string>(nullable: false),
                    PostalCode = table.Column<string>(nullable: false),
                    Province = table.Column<string>(nullable: false),
                    Country = table.Column<string>(nullable: false),
                    Phone = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    NIF = table.Column<string>(nullable: false),
                    ContactName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(nullable: false),
                    OrderNum = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    DeriveryDate = table.Column<DateTime>(nullable: false),
                    ContactName = table.Column<string>(nullable: true),
                    Total = table.Column<double>(nullable: false),
                    Delivered = table.Column<bool>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    PayingMethod = table.Column<string>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderLines",
                columns: table => new
                {
                    OrderLineId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderId = table.Column<int>(nullable: false),
                    ArticleId = table.Column<int>(nullable: false),
                    Lot = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Brand = table.Column<string>(nullable: false),
                    Category = table.Column<string>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    Iva = table.Column<int>(nullable: false),
                    Discount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLines", x => x.OrderLineId);
                    table.ForeignKey(
                        name: "FK_OrderLines_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    ArticleId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: false),
                    Lot = table.Column<string>(nullable: false),
                    Stock = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Brand = table.Column<string>(nullable: false),
                    Category = table.Column<string>(nullable: false),
                    Iva = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.ArticleId);
                });

            migrationBuilder.InsertData(
                table: "Articles",
                columns: new[] { "ArticleId", "Brand", "Category", "Description", "Iva", "Lot", "OrderLineId", "Price", "Stock" },
                values: new object[] { 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 21, "Lot-01", null, 10.5, 1000 });

            migrationBuilder.InsertData(
                table: "Clients",
                columns: new[] { "ClientId", "Address", "City", "ContactName", "Country", "Email", "NIF", "Name", "Phone", "PostalCode", "Province" },
                values: new object[] { 1, "Su casa", "Valencia", "Tu madre", "Españita", "emailflamote@gmail.com", "20945677-A", "Wei", "666555444", "46400", "Valencia" });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Name", "Type" },
                values: new object[] { 1, "Jesus", "Repartidor" });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "OrderId", "ClientId", "ContactName", "Date", "Delivered", "DeriveryDate", "EmployeeId", "OrderNum", "Paid", "PayingMethod", "Total" },
                values: new object[] { 1, 1, "Miguel", new DateTime(2021, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, false, "Cash", 1938.98 });

            migrationBuilder.InsertData(
                table: "OrderLines",
                columns: new[] { "OrderLineId", "ArticleId", "Brand", "Category", "Description", "Discount", "Iva", "Lot", "OrderId", "Price", "Quantity" },
                values: new object[] { 1, 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 0, 21, "Lot-01", 1, 10.5, 15 });

            migrationBuilder.InsertData(
                table: "OrderLines",
                columns: new[] { "OrderLineId", "ArticleId", "Brand", "Category", "Description", "Discount", "Iva", "Lot", "OrderId", "Price", "Quantity" },
                values: new object[] { 2, 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 10, 21, "Lot-01", 1, 10.5, 25 });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLines_OrderId",
                table: "OrderLines",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ClientId",
                table: "Orders",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_EmployeeId",
                table: "Orders",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "OrderLines");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}