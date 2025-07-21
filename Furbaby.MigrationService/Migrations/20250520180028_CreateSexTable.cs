using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Furbaby.MigrationService.Migrations
{
    /// <inheritdoc />
    public partial class CreateSexTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SexId",
                table: "Pets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Sexes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sexes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Sexes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Male" },
                    { 2, "Female" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pets_SexId",
                table: "Pets",
                column: "SexId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_Sexes_SexId",
                table: "Pets",
                column: "SexId",
                principalTable: "Sexes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_Sexes_SexId",
                table: "Pets");

            migrationBuilder.DropTable(
                name: "Sexes");

            migrationBuilder.DropIndex(
                name: "IX_Pets_SexId",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "SexId",
                table: "Pets");
        }
    }
}
