using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReWear_backend.Migrations
{
    public partial class ReWearUser_Dresses_Attribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_HealthStates_HealthStateId",
                table: "Dresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_Sizes_SizeId",
                table: "Dresses");

            migrationBuilder.AlterColumn<Guid>(
                name: "SizeId",
                table: "Dresses",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "HealthStateId",
                table: "Dresses",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Dresses_HealthStates_HealthStateId",
                table: "Dresses",
                column: "HealthStateId",
                principalTable: "HealthStates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dresses_Sizes_SizeId",
                table: "Dresses",
                column: "SizeId",
                principalTable: "Sizes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_HealthStates_HealthStateId",
                table: "Dresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_Sizes_SizeId",
                table: "Dresses");

            migrationBuilder.AlterColumn<Guid>(
                name: "SizeId",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "HealthStateId",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dresses_HealthStates_HealthStateId",
                table: "Dresses",
                column: "HealthStateId",
                principalTable: "HealthStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Dresses_Sizes_SizeId",
                table: "Dresses",
                column: "SizeId",
                principalTable: "Sizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
