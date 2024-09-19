-- AlterTable
ALTER TABLE "admin_user" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "client_user" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'client';

-- AlterTable
ALTER TABLE "writer_company_user" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'writer_company';

-- AlterTable
ALTER TABLE "writer_user" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'writer';
