-- CreateTable
CREATE TABLE "job_details" (
    "id" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,
    "adminID" TEXT NOT NULL,
    "salesAdminID" TEXT,
    "writerID" TEXT,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT,
    "jobDeadline" TIMESTAMP(3) NOT NULL,
    "finalQuotationID" TEXT,
    "jobAmount" DOUBLE PRECISION NOT NULL,
    "jobTaxAmount" DOUBLE PRECISION NOT NULL,
    "jobFinalAmount" DOUBLE PRECISION NOT NULL,
    "completionDate" TIMESTAMP(3),
    "completionStatus" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_details" ADD CONSTRAINT "job_details_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "client_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_details" ADD CONSTRAINT "job_details_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "admin_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
