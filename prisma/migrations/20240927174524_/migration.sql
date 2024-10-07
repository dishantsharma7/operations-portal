-- AddForeignKey
ALTER TABLE "admin_user" ADD CONSTRAINT "admin_user_adminRoleID_fkey" FOREIGN KEY ("adminRoleID") REFERENCES "admin_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_details" ADD CONSTRAINT "job_details_writerID_fkey" FOREIGN KEY ("writerID") REFERENCES "writer_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_details" ADD CONSTRAINT "quotation_details_writerID_fkey" FOREIGN KEY ("writerID") REFERENCES "writer_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
