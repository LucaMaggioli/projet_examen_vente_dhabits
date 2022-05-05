using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReWear_backend.Migrations
{
    public partial class Create_ReWearUser_From_IdentityUser_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReWearUserId",
                table: "Dresses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dresses_ReWearUserId",
                table: "Dresses",
                column: "ReWearUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dresses_AspNetUsers_ReWearUserId",
                table: "Dresses",
                column: "ReWearUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dresses_AspNetUsers_ReWearUserId",
                table: "Dresses");

            migrationBuilder.DropIndex(
                name: "IX_Dresses_ReWearUserId",
                table: "Dresses");

            migrationBuilder.DropColumn(
                name: "ReWearUserId",
                table: "Dresses");
        }
    }
}
