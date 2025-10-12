using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class buurten_toegevoegd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gemeentes",
                columns: table => new
                {
                    NisCode = table.Column<string>(type: "text", nullable: false),
                    NaamNL = table.Column<string>(type: "text", nullable: false),
                    NaamFR = table.Column<string>(type: "text", nullable: false),
                    NaamDE = table.Column<string>(type: "text", nullable: true),
                    GesprokenTalen = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gemeentes", x => x.NisCode);
                });

            migrationBuilder.CreateTable(
                name: "DeelGemeentes",
                columns: table => new
                {
                    Nis6Code = table.Column<string>(type: "text", nullable: false),
                    NisCodeGemeente = table.Column<string>(type: "text", nullable: false),
                    NaamNL = table.Column<string>(type: "text", nullable: false),
                    NaamFR = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeelGemeentes", x => x.Nis6Code);
                    table.ForeignKey(
                        name: "FK_DeelGemeentes_Gemeentes_NisCodeGemeente",
                        column: x => x.NisCodeGemeente,
                        principalTable: "Gemeentes",
                        principalColumn: "NisCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Postcodes",
                columns: table => new
                {
                    Code = table.Column<string>(type: "text", nullable: false),
                    NisCodeGemeente = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Postcodes", x => new { x.Code, x.NisCodeGemeente });
                    table.ForeignKey(
                        name: "FK_Postcodes_Gemeentes_NisCodeGemeente",
                        column: x => x.NisCodeGemeente,
                        principalTable: "Gemeentes",
                        principalColumn: "NisCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Buurten",
                columns: table => new
                {
                    StatistischeSectorCode = table.Column<string>(type: "text", nullable: false),
                    NisGemeente = table.Column<string>(type: "text", nullable: false),
                    Nis6DeelGemeente = table.Column<string>(type: "text", nullable: false),
                    NaamNL = table.Column<string>(type: "text", nullable: false),
                    NaamFR = table.Column<string>(type: "text", nullable: false),
                    NaamDE = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buurten", x => x.StatistischeSectorCode);
                    table.ForeignKey(
                        name: "FK_Buurten_DeelGemeentes_Nis6DeelGemeente",
                        column: x => x.Nis6DeelGemeente,
                        principalTable: "DeelGemeentes",
                        principalColumn: "Nis6Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Buurten_Gemeentes_NisGemeente",
                        column: x => x.NisGemeente,
                        principalTable: "Gemeentes",
                        principalColumn: "NisCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Buurten_Nis6DeelGemeente",
                table: "Buurten",
                column: "Nis6DeelGemeente");

            migrationBuilder.CreateIndex(
                name: "IX_Buurten_NisGemeente",
                table: "Buurten",
                column: "NisGemeente");

            migrationBuilder.CreateIndex(
                name: "IX_DeelGemeentes_NisCodeGemeente",
                table: "DeelGemeentes",
                column: "NisCodeGemeente");

            migrationBuilder.CreateIndex(
                name: "IX_Postcodes_NisCodeGemeente",
                table: "Postcodes",
                column: "NisCodeGemeente");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Buurten");

            migrationBuilder.DropTable(
                name: "Postcodes");

            migrationBuilder.DropTable(
                name: "DeelGemeentes");

            migrationBuilder.DropTable(
                name: "Gemeentes");
        }
    }
}
