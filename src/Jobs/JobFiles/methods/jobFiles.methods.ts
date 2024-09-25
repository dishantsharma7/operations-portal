import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import prisma_client from "../../../prisma";
import { JobFilesInterface } from "../models/jobFiles.models";

const createNewJobFilesMethod = async (JobFileData: JobFilesInterface) => {
  console.log("🚀 ~ createNewJobFilesMethod ~ JobFileData:", JobFileData);
  //   const existingJob = await prisma_client.job_files.findFirst({
  //     where: { date: JobFileData.date },
  //   });

  //   if (existingReading) {
  //     throw new BadRequestError("Job Detail for this date already exists!");
  //   }

  const addedReading = await prisma_client.job_files.create({
    data: {
      ...JobFileData,
    },
    // data: { ...JobFileData },
  });

  if (!addedReading) {
    throw new BadRequestError("Failed to add new Job Detail ");
  }

  return new SuccessResponse("Added new Job Detail", addedReading);
};

const getJobFilesMethod = async (JobFileId: string) => {
  const JobFilesData = await prisma_client.job_files.findMany({
    where: {
      id: JobFileId,
    },
  });

  if (!JobFilesData) {
    throw new BadRequestError("No Job Detail found!");
  }

  return new SuccessResponse("Fetched Job Detail ", JobFilesData);
};

const updateJobFilesMethod = async (
  JobFileId: string,
  updatedJobFile: JobFilesInterface
) => {
  console.log("🚀 ~ updateJobFilesMethod ~ updatedJobFile:", updatedJobFile);
  const existingJobFileData = await prisma_client.job_files.findFirst({
    where: { id: JobFileId },
  });

  if (!existingJobFileData) {
    throw new BadRequestError("Job Detail does not exist!");
  }

  const updatedJobFileData = await prisma_client.job_files.update({
    where: { id: JobFileId },
    data: {
      ...updatedJobFile,
    },
  });

  if (!updatedJobFileData) {
    throw new BadRequestError("Failed to update Job Detail");
  }

  return new SuccessResponse(
    "Job Detail updated successfully",
    updatedJobFileData
  );
};

const deleteJobFileMethod = async (JobFileId: string) => {
  const existingJobFile = await prisma_client.job_files.findFirst({
    where: { id: JobFileId },
  });

  if (!existingJobFile) {
    throw new BadRequestError("Job Detail does not exist!");
  } else {
    await prisma_client.job_files.delete({
      where: { id: JobFileId },
    });

    return new SuccessMsgResponse("Job Detail deleted successfully");
  }
};

export {
  createNewJobFilesMethod,
  getJobFilesMethod,
  updateJobFilesMethod,
  deleteJobFileMethod,
};
