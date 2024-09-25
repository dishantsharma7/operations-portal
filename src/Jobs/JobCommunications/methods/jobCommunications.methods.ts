import { BadRequestError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import prisma_client from "../../../prisma";
import { JobCommunicationsInterface } from "../models/jobCommunications.models";

const createNewJobCommunicationsMethod = async (
  JobCommunicationData: JobCommunicationsInterface
) => {
  console.log(
    "🚀 ~ createNewJobCommunicationsMethod ~ JobCommunicationData:",
    JobCommunicationData
  );
  //   const existingJob = await prisma_client.job_Communications.findFirst({
  //     where: { date: JobCommunicationData.date },
  //   });

  //   if (existingReading) {
  //     throw new BadRequestError("Job Communication for this date already exists!");
  //   }

  const addedReading = await prisma_client.job_communications.create({
    data: {
      ...JobCommunicationData,
    },
    // data: { ...JobCommunicationData },
  });

  if (!addedReading) {
    throw new BadRequestError("Failed to add new Job Communication ");
  }

  return new SuccessResponse("Added new Job Communication", addedReading);
};

const getJobCommunicationsMethod = async (jobCommunicationId: string) => {
  const JobCommunicationsData = await prisma_client.job_communications.findMany(
    {
      where: {
        id: jobCommunicationId,
      },
    }
  );

  if (!JobCommunicationsData) {
    throw new BadRequestError("No Job Communication found!");
  }

  return new SuccessResponse(
    "Fetched Job Communication ",
    JobCommunicationsData
  );
};

const updateJobCommunicationsMethod = async (
  JobCommunicationId: string,
  updatedJobCommunication: JobCommunicationsInterface
) => {
  console.log(
    "🚀 ~ updateJobCommunicationsMethod ~ updatedJobCommunication:",
    updatedJobCommunication
  );
  const existingJobCommunicationData =
    await prisma_client.job_communications.findFirst({
      where: { id: JobCommunicationId },
    });

  if (!existingJobCommunicationData) {
    throw new BadRequestError("Job Communication does not exist!");
  }

  const updatedJobCommunicationData =
    await prisma_client.job_communications.update({
      where: { id: JobCommunicationId },
      data: {
        ...updatedJobCommunication,
      },
    });

  if (!updatedJobCommunicationData) {
    throw new BadRequestError("Failed to update Job Communication");
  }

  return new SuccessResponse(
    "Job Communication updated successfully",
    updatedJobCommunicationData
  );
};

const deleteJobCommunicationMethod = async (JobCommunicationId: string) => {
  const existingJobCommunication =
    await prisma_client.job_communications.findFirst({
      where: { id: JobCommunicationId },
    });

  if (!existingJobCommunication) {
    throw new BadRequestError("Job Communication does not exist!");
  } else {
    await prisma_client.job_communications.delete({
      where: { id: JobCommunicationId },
    });

    return new SuccessMsgResponse("Job Communication deleted successfully");
  }
};

export {
  createNewJobCommunicationsMethod,
  getJobCommunicationsMethod,
  updateJobCommunicationsMethod,
  deleteJobCommunicationMethod,
};
