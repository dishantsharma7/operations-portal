import * as jobDeailsMethods from "../methods/jobDetails.methods";
import { JobDetailsInterface } from "../models/jobDetails.models";

const createNewJobDetailService = async (
  JobDetailData: JobDetailsInterface
) => {
  const addedReading = await jobDeailsMethods.createNewJobDetailsMethod(
    JobDetailData
  );
  return addedReading;
};

const getJobDetailsService = async (jobDetailId: string) => {
  const reading = await jobDeailsMethods.getJobDetailsMethod(jobDetailId);
  return reading;
};

const updateJobDetailsService = async (
  JobDetailId: string,
  updatedJobDetail: JobDetailsInterface
) => {
  const updatedReadings = await jobDeailsMethods.updateJobDetailsMethod(
    JobDetailId,
    updatedJobDetail
  );
  return updatedReadings;
};

const deleteJobDetailService = async (JobDetailId: string) => {
  const result = await jobDeailsMethods.deleteJobDetailMethod(JobDetailId);
  return result;
};

export {
  createNewJobDetailService,
  getJobDetailsService,
  updateJobDetailsService,
  deleteJobDetailService,
};
