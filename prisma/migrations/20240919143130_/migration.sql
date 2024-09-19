-- AlterTable
ALTER TABLE "writer_company_user" ADD COLUMN     "specializationID" TEXT;

-- AlterTable
ALTER TABLE "writer_user" ADD COLUMN     "departmentID" TEXT;

-- CreateTable
CREATE TABLE "specialization" (
    "id" TEXT NOT NULL,
    "specializationName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "writer_company_user" ADD CONSTRAINT "writer_company_user_specializationID_fkey" FOREIGN KEY ("specializationID") REFERENCES "specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writer_user" ADD CONSTRAINT "writer_user_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writer_user" ADD CONSTRAINT "writer_user_writerCompanyID_fkey" FOREIGN KEY ("writerCompanyID") REFERENCES "writer_company_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
