-- CreateTable
CREATE TABLE "job_communications" (
    "id" TEXT NOT NULL,
    "jobDetailsID" TEXT NOT NULL,
    "communicationSender" TEXT NOT NULL,
    "communicationMessage" TEXT NOT NULL,
    "anonymityStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_communications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_communications" ADD CONSTRAINT "job_communications_jobDetailsID_fkey" FOREIGN KEY ("jobDetailsID") REFERENCES "job_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
