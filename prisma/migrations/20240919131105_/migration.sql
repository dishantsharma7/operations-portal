/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `writer_company_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `writer_user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phoneNumber` on table `writer_company_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `writer_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "writer_company_user" ALTER COLUMN "phoneNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "writer_user" ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "writer_company_user_phoneNumber_key" ON "writer_company_user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "writer_user_phoneNumber_key" ON "writer_user"("phoneNumber");
