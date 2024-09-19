/*
  Warnings:

  - The primary key for the `admin_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `client_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `writer_company_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `writer_user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "admin_user" DROP CONSTRAINT "admin_user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "adminRoleID" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admin_user_id_seq";

-- AlterTable
ALTER TABLE "client_user" DROP CONSTRAINT "client_user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "client_user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "client_user_id_seq";

-- AlterTable
ALTER TABLE "writer_company_user" DROP CONSTRAINT "writer_company_user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "writer_company_user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "writer_company_user_id_seq";

-- AlterTable
ALTER TABLE "writer_user" DROP CONSTRAINT "writer_user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "writer_user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "writer_user_id_seq";
