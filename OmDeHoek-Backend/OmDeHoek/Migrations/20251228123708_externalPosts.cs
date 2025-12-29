using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class externalPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeelGemeenteNis6Code",
                table: "Messages",
                type: "character varying(6)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nis6DeelGemeente",
                table: "Messages",
                type: "character varying(6)",
                maxLength: 6,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_DeelGemeenteNis6Code",
                table: "Messages",
                column: "DeelGemeenteNis6Code");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Nis6DeelGemeente",
                table: "Messages",
                column: "Nis6DeelGemeente");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_DeelGemeentes_DeelGemeenteNis6Code",
                table: "Messages",
                column: "DeelGemeenteNis6Code",
                principalTable: "DeelGemeentes",
                principalColumn: "Nis6Code");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_DeelGemeentes_Nis6DeelGemeente",
                table: "Messages",
                column: "Nis6DeelGemeente",
                principalTable: "DeelGemeentes",
                principalColumn: "Nis6Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_DeelGemeentes_DeelGemeenteNis6Code",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_DeelGemeentes_Nis6DeelGemeente",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_DeelGemeenteNis6Code",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_Nis6DeelGemeente",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "DeelGemeenteNis6Code",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Nis6DeelGemeente",
                table: "Messages");
        }
    }
}
