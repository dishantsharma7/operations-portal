/*
  Warnings:

  - Changed the type of `zipcode` on the `admin_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `zipcode` on the `client_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `zipcode` on the `writer_company_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `zipcode` on the `writer_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "admin_user" DROP COLUMN "zipcode",
ADD COLUMN     "zipcode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "client_user" DROP COLUMN "zipcode",
ADD COLUMN     "zipcode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "writer_company_user" DROP COLUMN "zipcode",
ADD COLUMN     "zipcode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "writer_user" DROP COLUMN "zipcode",
ADD COLUMN     "zipcode" INTEGER NOT NULL;
