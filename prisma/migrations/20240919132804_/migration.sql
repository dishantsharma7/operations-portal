/*
  Warnings:

  - You are about to drop the column `POCFirstName` on the `writer_company_user` table. All the data in the column will be lost.
  - You are about to drop the column `POCLastName` on the `writer_company_user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `writer_company_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `writer_company_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "writer_company_user" DROP COLUMN "POCFirstName",
DROP COLUMN "POCLastName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
