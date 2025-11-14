using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class MigrationFixingError : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Postcodes",
                table: "Postcodes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Postcodes",
                table: "Postcodes",
                columns: new[] { "Code", "NisCodeGemeente" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Postcodes",
                table: "Postcodes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Postcodes",
                table: "Postcodes",
                column: "Code");
        }
    }
}
