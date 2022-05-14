using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReWear_backend.Migrations
{
    public partial class PremiumPacks_Table_Fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoughtPack_AspNetUsers_ReWearUserId",
                table: "BoughtPack");

            migrationBuilder.DropForeignKey(
                name: "FK_BoughtPack_PremiumPacks_PremiumPackId",
                table: "BoughtPack");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BoughtPack",
                table: "BoughtPack");

            migrationBuilder.RenameTable(
                name: "BoughtPack",
                newName: "BoughtPacks");

            migrationBuilder.RenameIndex(
                name: "IX_BoughtPack_ReWearUserId",
                table: "BoughtPacks",
                newName: "IX_BoughtPacks_ReWearUserId");

            migrationBuilder.RenameIndex(
                name: "IX_BoughtPack_PremiumPackId",
                table: "BoughtPacks",
                newName: "IX_BoughtPacks_PremiumPackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BoughtPacks",
                table: "BoughtPacks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoughtPacks_AspNetUsers_ReWearUserId",
                table: "BoughtPacks",
                column: "ReWearUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoughtPacks_PremiumPacks_PremiumPackId",
                table: "BoughtPacks",
                column: "PremiumPackId",
                principalTable: "PremiumPacks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoughtPacks_AspNetUsers_ReWearUserId",
                table: "BoughtPacks");

            migrationBuilder.DropForeignKey(
                name: "FK_BoughtPacks_PremiumPacks_PremiumPackId",
                table: "BoughtPacks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BoughtPacks",
                table: "BoughtPacks");

            migrationBuilder.RenameTable(
                name: "BoughtPacks",
                newName: "BoughtPack");

            migrationBuilder.RenameIndex(
                name: "IX_BoughtPacks_ReWearUserId",
                table: "BoughtPack",
                newName: "IX_BoughtPack_ReWearUserId");

            migrationBuilder.RenameIndex(
                name: "IX_BoughtPacks_PremiumPackId",
                table: "BoughtPack",
                newName: "IX_BoughtPack_PremiumPackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BoughtPack",
                table: "BoughtPack",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoughtPack_AspNetUsers_ReWearUserId",
                table: "BoughtPack",
                column: "ReWearUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BoughtPack_PremiumPacks_PremiumPackId",
                table: "BoughtPack",
                column: "PremiumPackId",
                principalTable: "PremiumPacks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
