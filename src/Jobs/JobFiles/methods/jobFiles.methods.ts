import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import prisma_client from "../../../prisma";
import { JobFilesInterface } from "../models/jobFiles.models";

const createNewJobFilesMethod = async (JobFileData: JobFilesInterface) => {
  console.log("🚀 ~ createNewJobFilesMethod ~ JobFileData:", JobFileData);

  const addedReading = await prisma_client.job_files.create({
    data: {
      ...JobFileData,
    },
    // data: { ...JobFileData },
  });

  if (!addedReading) {
    throw new BadRequestError("Failed to add new Job File ");
  }

  return new SuccessResponse("Added new Job File", addedReading);
};

const getJobFilesMethod = async (JobFileId: string) => {
  const JobFilesData = await prisma_client.job_files.findMany({
    where: {
      id: JobFileId,
    },
  });

  if (!JobFilesData) {
    throw new BadRequestError("No Job File found!");
  }

  return new SuccessResponse("Fetched Job File ", JobFilesData);
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
    throw new BadRequestError("Job File does not exist!");
  }

  const updatedJobFileData = await prisma_client.job_files.update({
    where: { id: JobFileId },
    data: {
      ...updatedJobFile,
    },
  });

  if (!updatedJobFileData) {
    throw new BadRequestError("Failed to update Job File");
  }

  return new SuccessResponse(
    "Job File updated successfully",
    updatedJobFileData
  );
};

const deleteJobFileMethod = async (JobFileId: string) => {
  const existingJobFile = await prisma_client.job_files.findFirst({
    where: { id: JobFileId },
  });

  if (!existingJobFile) {
    throw new BadRequestError("Job File does not exist!");
  } else {
    await prisma_client.job_files.delete({
      where: { id: JobFileId },
    });

    return new SuccessMsgResponse("Job File deleted successfully");
  }
};

export {
  createNewJobFilesMethod,
  getJobFilesMethod,
  updateJobFilesMethod,
  deleteJobFileMethod,
};
