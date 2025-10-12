using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class postcode_gemeente_link : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Postcodes",
                type: "character varying(4)",
                maxLength: 4,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Postcodes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(4)",
                oldMaxLength: 4);

            migrationBuilder.AddColumn<string>(
                name: "GemeenteNisCode",
                table: "Postcodes",
                type: "character varying(5)",
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
    }
}
