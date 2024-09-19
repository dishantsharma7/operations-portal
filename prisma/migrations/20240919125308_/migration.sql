/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `admin_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_user_phoneNumber_key" ON "admin_user"("phoneNumber");
