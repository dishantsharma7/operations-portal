import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import prisma_client from "../../../prisma";
import { JobDetailsInterface } from "../models/jobDetails.models";

const createNewJobDetailsMethod = async (
  JobDetailData: JobDetailsInterface
) => {
  console.log("🚀 ~ createNewJobDetailsMethod ~ JobDetailData:", JobDetailData);
  //   const existingJob = await prisma_client.job_details.findFirst({
  //     where: { date: JobDetailData.date },
  //   });

  //   if (existingReading) {
  //     throw new BadRequestError("Job Detail for this date already exists!");
  //   }

  const addedReading = await prisma_client.job_details.create({
    data: {
      ...JobDetailData,
    },
    // data: { ...JobDetailData },
  });

  if (!addedReading) {
    throw new BadRequestError("Failed to add new Job Detail ");
  }

  return new SuccessResponse("Added new Job Detail", addedReading);
};

const getJobDetailsMethod = async (jobDetailId: string) => {
  const JobDetailsData = await prisma_client.job_details.findMany({
    where: {
      id: jobDetailId,
    },
  });

  if (!JobDetailsData) {
    throw new BadRequestError("No Job Detail found!");
  }

  return new SuccessResponse("Fetched Job Detail ", JobDetailsData);
};

const updateJobDetailsMethod = async (
  JobDetailId: string,
  updatedJobDetail: JobDetailsInterface
) => {
  console.log(
    "🚀 ~ updateJobDetailsMethod ~ updatedJobDetail:",
    updatedJobDetail
  );
  const existingJobDetailData = await prisma_client.job_details.findFirst({
    where: { id: JobDetailId },
  });

  if (!existingJobDetailData) {
    throw new BadRequestError("Job Detail does not exist!");
  }

  const updatedJobDetailData = await prisma_client.job_details.update({
    where: { id: JobDetailId },
    data: {
      ...updatedJobDetail,
    },
  });

  if (!updatedJobDetailData) {
    throw new BadRequestError("Failed to update Job Detail");
  }

  return new SuccessResponse(
    "Job Detail updated successfully",
    updatedJobDetailData
  );
};

const deleteJobDetailMethod = async (JobDetailId: string) => {
  const existingJobDetail = await prisma_client.job_details.findFirst({
    where: { id: JobDetailId },
  });

  if (!existingJobDetail) {
    throw new BadRequestError("Job Detail does not exist!");
  } else {
    await prisma_client.job_details.delete({
      where: { id: JobDetailId },
    });

    return new SuccessMsgResponse("Job Detail deleted successfully");
  }
};

export {
  createNewJobDetailsMethod,
  getJobDetailsMethod,
  updateJobDetailsMethod,
  deleteJobDetailMethod,
};
