using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmDeHoek.Migrations
{
    /// <inheritdoc />
    public partial class naming_consistancy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NaamNL",
                table: "Gemeentes",
                newName: "NaamNl");

            migrationBuilder.RenameColumn(
                name: "NaamFR",
                table: "Gemeentes",
                newName: "NaamFr");

            migrationBuilder.RenameColumn(
                name: "NaamDE",
                table: "Gemeentes",
                newName: "NaamDe");

            migrationBuilder.RenameColumn(
                name: "NaamNL",
                table: "DeelGemeentes",
                newName: "NaamNl");

            migrationBuilder.RenameColumn(
                name: "NaamFR",
                table: "DeelGemeentes",
                newName: "NaamFr");

            migrationBuilder.RenameColumn(
                name: "NaamNL",
                table: "Buurten",
                newName: "NaamNl");

            migrationBuilder.RenameColumn(
                name: "NaamFR",
                table: "Buurten",
                newName: "NaamFr");

            migrationBuilder.RenameColumn(
                name: "NaamDE",
                table: "Buurten",
                newName: "NaamDe");

            migrationBuilder.AlterColumn<string>(
                name: "GemeenteNisCode",
                table: "Postcodes",
                type: "character varying(5)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NisCodeGemeente",
                table: "Postcodes",
                type: "character varying(5)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamNl",
                table: "Gemeentes",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamFr",
                table: "Gemeentes",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamDe",
                table: "Gemeentes",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GesprokenTalen",
                table: "Gemeentes",
                type: "character varying(3)",
                maxLength: 3,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NisCode",
                table: "Gemeentes",
                type: "character varying(5)",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NisCodeGemeente",
                table: "DeelGemeentes",
                type: "character varying(5)",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamNl",
                table: "DeelGemeentes",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamFr",
                table: "DeelGemeentes",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Nis6Code",
                table: "DeelGemeentes",
                type: "character varying(6)",
                maxLength: 6,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Nis6DeelGemeente",
                table: "Buurten",
                type: "character varying(6)",
                maxLength: 6,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamNl",
                table: "Buurten",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamFr",
                table: "Buurten",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NaamDe",
                table: "Buurten",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "StatistischeSectorCode",
                table: "Buurten",
                type: "character varying(9)",
                maxLength: 9,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NaamNl",
                table: "Gemeentes",
                newName: "NaamNL");

            migrationBuilder.RenameColumn(
                name: "NaamFr",
                table: "Gemeentes",
                newName: "NaamFR");

            migrationBuilder.RenameColumn(
                name: "NaamDe",
                table: "Gemeentes",
                newName: "NaamDE");

            migrationBuilder.RenameColumn(
                name: "NaamNl",
                table: "DeelGemeentes",
                newName: "NaamNL");

            migrationBuilder.RenameColumn(
                name: "NaamFr",
                table: "DeelGemeentes",
                newName: "NaamFR");

            migrationBuilder.RenameColumn(
                name: "NaamNl",
                table: "Buurten",
                newName: "NaamNL");

            migrationBuilder.RenameColumn(
                name: "NaamFr",
                table: "Buurten",
                newName: "NaamFR");

            migrationBuilder.RenameColumn(
                name: "NaamDe",
                table: "Buurten",
                newName: "NaamDE");

            migrationBuilder.AlterColumn<string>(
                name: "GemeenteNisCode",
                table: "Postcodes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NisCodeGemeente",
                table: "Postcodes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(5)");

            migrationBuilder.AlterColumn<string>(
                name: "NaamNL",
                table: "Gemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NaamFR",
                table: "Gemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NaamDE",
                table: "Gemeentes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GesprokenTalen",
                table: "Gemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(3)",
                oldMaxLength: 3);

            migrationBuilder.AlterColumn<string>(
                name: "NisCode",
                table: "Gemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(5)",
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<string>(
                name: "NisCodeGemeente",
                table: "DeelGemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(5)",
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<string>(
                name: "NaamNL",
                table: "DeelGemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NaamFR",
                table: "DeelGemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Nis6Code",
                table: "DeelGemeentes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(6)",
                oldMaxLength: 6);

            migrationBuilder.AlterColumn<string>(
                name: "Nis6DeelGemeente",
                table: "Buurten",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(6)",
                oldMaxLength: 6);

            migrationBuilder.AlterColumn<string>(
                name: "NaamNL",
                table: "Buurten",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NaamFR",
                table: "Buurten",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NaamDE",
                table: "Buurten",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "StatistischeSectorCode",
                table: "Buurten",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(9)",
                oldMaxLength: 9);
        }
    }
}
