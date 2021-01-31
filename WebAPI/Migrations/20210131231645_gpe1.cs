using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GPE.Migrations
{
    public partial class gpe1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    ArticleId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 100, nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Brand = table.Column<string>(maxLength: 50, nullable: false),
                    Category = table.Column<string>(maxLength: 50, nullable: false),
                    Iva = table.Column<int>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.ArticleId);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Address = table.Column<string>(maxLength: 100, nullable: false),
                    City = table.Column<string>(maxLength: 50, nullable: false),
                    PostalCode = table.Column<string>(maxLength: 5, nullable: false),
                    Province = table.Column<string>(maxLength: 50, nullable: false),
                    Country = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 13, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    NIF = table.Column<string>(maxLength: 50, nullable: false),
                    ContactName = table.Column<string>(maxLength: 50, nullable: true),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false)
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
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Type = table.Column<string>(maxLength: 50, nullable: false),
                    Enabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Lots",
                columns: table => new
                {
                    ArticleId = table.Column<int>(nullable: false),
                    LotId = table.Column<string>(maxLength: 30, nullable: false),
                    Stock = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lots", x => new { x.ArticleId, x.LotId });
                    table.ForeignKey(
                        name: "FK_Lots_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "ArticleId",
                        onDelete: ReferentialAction.Cascade);
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
                    ContactName = table.Column<string>(maxLength: 50, nullable: true),
                    Total = table.Column<double>(nullable: false),
                    Delivered = table.Column<bool>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    PayingMethod = table.Column<string>(maxLength: 50, nullable: true),
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
                    OrderId = table.Column<int>(nullable: false),
                    LineId = table.Column<int>(nullable: false),
                    ArticleId = table.Column<int>(nullable: false),
                    LotId = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(maxLength: 150, nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Brand = table.Column<string>(maxLength: 50, nullable: false),
                    Category = table.Column<string>(maxLength: 50, nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    Iva = table.Column<int>(nullable: false),
                    Discount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLines", x => new { x.OrderId, x.LineId });
                    table.ForeignKey(
                        name: "FK_OrderLines_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "ArticleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderLines_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Articles",
                columns: new[] { "ArticleId", "Brand", "Category", "Description", "Enabled", "Iva", "Price" },
                values: new object[,]
                {
                    { 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", false, 21, 10.5 },
                    { 2, "MarcaMala", "RialOne", "SegundoArticuloToFlama", false, 4, 15.5 }
                });

            migrationBuilder.InsertData(
                table: "Clients",
                columns: new[] { "ClientId", "Address", "City", "ContactName", "Country", "Email", "Enabled", "NIF", "Name", "Phone", "PostalCode", "Province", "RegisterDate" },
                values: new object[,]
                {
                    { 1, "Su casa", "Valencia", "Su madre", "Españita", "emailflamote@gmail.com", true, "20945677-A", "Wei", "666555444", "46400", "Valencia", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "Mi casa", "Cullera", "Antonia josefa estafania aurelia", "Españita", "emaildamia@gmail.com", true, "11122233-B", "Damia", "666555444", "46400", "Valencia", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Enabled", "Name", "Type" },
                values: new object[,]
                {
                    { 1, false, "Jesus", "Deliverer" },
                    { 2, false, "Miguel", "Comercial" }
                });

            migrationBuilder.InsertData(
                table: "Lots",
                columns: new[] { "ArticleId", "LotId", "Stock" },
                values: new object[,]
                {
                    { 1, "Lote-01", 500 },
                    { 2, "Lote-02", 1000 }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "OrderId", "ClientId", "ContactName", "Date", "Delivered", "DeriveryDate", "EmployeeId", "OrderNum", "Paid", "PayingMethod", "Total" },
                values: new object[,]
                {
                    { 1, 1, "Wei", new DateTime(2021, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, false, "Cash", 1938.98 },
                    { 2, 2, "Damia", new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2021, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 2, false, "Cash", 2000.98 }
                });

            migrationBuilder.InsertData(
                table: "OrderLines",
                columns: new[] { "OrderId", "LineId", "ArticleId", "Brand", "Category", "Description", "Discount", "Iva", "LotId", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 0, 21, "Lot-01", 10.5, 15 },
                    { 1, 2, 1, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 10, 21, "Lot-01", 10.5, 25 },
                    { 2, 1, 2, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 0, 4, "Lot-02", 15.5, 15 },
                    { 2, 2, 2, "MarcaBuena", "RialOne", "PrimerArticuloToFlama", 10, 4, "Lot-02", 15.5, 25 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLines_ArticleId",
                table: "OrderLines",
                column: "ArticleId");

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
                name: "Lots");

            migrationBuilder.DropTable(
                name: "OrderLines");

            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
