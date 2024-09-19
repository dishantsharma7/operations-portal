/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `client_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_user_phoneNumber_key" ON "client_user"("phoneNumber");
