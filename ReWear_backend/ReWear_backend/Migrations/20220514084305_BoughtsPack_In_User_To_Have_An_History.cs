using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReWear_backend.Migrations
{
    public partial class BoughtsPack_In_User_To_Have_An_History : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValidityTime",
                table: "PremiumPacks");

            migrationBuilder.DropColumn(
                name: "IsPremium",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<double>(
                name: "ValidityDays",
                table: "PremiumPacks",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "BoughtPack",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BoughtDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PremiumPackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ReWearUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoughtPack", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoughtPack_AspNetUsers_ReWearUserId",
                        column: x => x.ReWearUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BoughtPack_PremiumPacks_PremiumPackId",
                        column: x => x.PremiumPackId,
                        principalTable: "PremiumPacks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoughtPack_PremiumPackId",
                table: "BoughtPack",
                column: "PremiumPackId");

            migrationBuilder.CreateIndex(
                name: "IX_BoughtPack_ReWearUserId",
                table: "BoughtPack",
                column: "ReWearUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoughtPack");

            migrationBuilder.DropColumn(
                name: "ValidityDays",
                table: "PremiumPacks");

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidityTime",
                table: "PremiumPacks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsPremium",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
