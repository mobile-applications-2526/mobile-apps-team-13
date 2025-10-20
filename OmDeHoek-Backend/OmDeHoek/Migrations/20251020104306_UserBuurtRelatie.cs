using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class UserBuurtRelatie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserBuurten",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    SectorCodeBuurt = table.Column<string>(type: "character varying(9)", maxLength: 9, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBuurten", x => new { x.UserId, x.SectorCodeBuurt });
                    table.ForeignKey(
                        name: "FK_UserBuurten_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBuurten_Buurten_SectorCodeBuurt",
                        column: x => x.SectorCodeBuurt,
                        principalTable: "Buurten",
                        principalColumn: "StatistischeSectorCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserBuurten_SectorCodeBuurt",
                table: "UserBuurten",
                column: "SectorCodeBuurt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserBuurten");
        }
    }
}
