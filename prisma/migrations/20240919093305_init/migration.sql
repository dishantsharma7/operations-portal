/*
  Warnings:

  - You are about to drop the column `firstName` on the `writer_company_user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `writer_company_user` table. All the data in the column will be lost.
  - Added the required column `POCFirstName` to the `writer_company_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `POCLastName` to the `writer_company_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "writer_company_user" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "POCFirstName" TEXT NOT NULL,
ADD COLUMN     "POCLastName" TEXT NOT NULL;
