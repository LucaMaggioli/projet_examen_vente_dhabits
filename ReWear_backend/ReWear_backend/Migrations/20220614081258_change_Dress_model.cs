using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReWear_backend.Migrations
{
    public partial class change_Dress_model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Dresses_DressId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_HealthStates_HealthStateId",
                table: "Dresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_Sizes_SizeId",
                table: "Dresses");

            migrationBuilder.DropIndex(
                name: "IX_Dresses_HealthStateId",
                table: "Dresses");

            migrationBuilder.DropIndex(
                name: "IX_Dresses_SizeId",
                table: "Dresses");

            migrationBuilder.DropIndex(
                name: "IX_Categories_DressId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "HealthStateId",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "SizeId",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "DressId",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HealthState",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "Dresses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "HealthState",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Dresses");

            migrationBuilder.AddColumn<Guid>(
                name: "HealthStateId",
                table: "Dresses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SizeId",
                table: "Dresses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DressId",
                table: "Categories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dresses_HealthStateId",
                table: "Dresses",
                column: "HealthStateId");

            migrationBuilder.CreateIndex(
                name: "IX_Dresses_SizeId",
                table: "Dresses",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_DressId",
                table: "Categories",
                column: "DressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Dresses_DressId",
                table: "Categories",
                column: "DressId",
                principalTable: "Dresses",
                principalColumn: "Id");

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
    }
}
