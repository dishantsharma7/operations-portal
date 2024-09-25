-- CreateTable
CREATE TABLE "job_files" (
    "id" TEXT NOT NULL,
    "jobDetailsID" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileDescription" TEXT,
    "fileUploadLink" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_details" (
    "id" TEXT NOT NULL,
    "writerID" TEXT NOT NULL,
    "jobDetailsID" TEXT NOT NULL,
    "durationDetails" TEXT NOT NULL,
    "quotationAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "quotation_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_files" ADD CONSTRAINT "job_files_jobDetailsID_fkey" FOREIGN KEY ("jobDetailsID") REFERENCES "job_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_details" ADD CONSTRAINT "quotation_details_jobDetailsID_fkey" FOREIGN KEY ("jobDetailsID") REFERENCES "job_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
