using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class postcode_integratie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Buurten_Gemeentes_NisGemeente",
                table: "Buurten");

            migrationBuilder.DropIndex(
                name: "IX_Buurten_NisGemeente",
                table: "Buurten");

            migrationBuilder.DropColumn(
                name: "NisGemeente",
                table: "Buurten");

            migrationBuilder.AddColumn<string>(
                name: "GemeenteNisCode",
                table: "Postcodes",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Postcodes_GemeenteNisCode",
                table: "Postcodes",
                column: "GemeenteNisCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Postcodes_Gemeentes_GemeenteNisCode",
                table: "Postcodes",
                column: "GemeenteNisCode",
                principalTable: "Gemeentes",
                principalColumn: "NisCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postcodes_Gemeentes_GemeenteNisCode",
                table: "Postcodes");

            migrationBuilder.DropIndex(
                name: "IX_Postcodes_GemeenteNisCode",
                table: "Postcodes");

            migrationBuilder.DropColumn(
                name: "GemeenteNisCode",
                table: "Postcodes");

            migrationBuilder.AddColumn<string>(
                name: "NisGemeente",
                table: "Buurten",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Buurten_NisGemeente",
                table: "Buurten",
                column: "NisGemeente");

            migrationBuilder.AddForeignKey(
                name: "FK_Buurten_Gemeentes_NisGemeente",
                table: "Buurten",
                column: "NisGemeente",
                principalTable: "Gemeentes",
                principalColumn: "NisCode",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
