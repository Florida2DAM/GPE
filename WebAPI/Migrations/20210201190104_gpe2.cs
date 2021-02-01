using Microsoft.EntityFrameworkCore.Migrations;

namespace GPE.Migrations
{
    public partial class gpe2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Iva",
                table: "Articles",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                column: "Iva",
                value: 21.0);

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                column: "Iva",
                value: 4.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Iva",
                table: "Articles",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                column: "Iva",
                value: 21);

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                column: "Iva",
                value: 4);
        }
    }
}
