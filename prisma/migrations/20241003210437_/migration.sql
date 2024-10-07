-- DropForeignKey
ALTER TABLE "admin_user" DROP CONSTRAINT "admin_user_adminRoleID_fkey";

-- AlterTable
ALTER TABLE "admin_user" ALTER COLUMN "adminRoleID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "admin_user" ADD CONSTRAINT "admin_user_adminRoleID_fkey" FOREIGN KEY ("adminRoleID") REFERENCES "admin_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
