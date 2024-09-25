import * as jobDetailsMethods from "../methods/jobDetails.methods";
import { JobDetailsInterface } from "../models/jobDetails.models";

const createNewJobDetailService = async (
  JobDetailData: JobDetailsInterface
) => {
  const addedReading = await jobDetailsMethods.createNewJobDetailsMethod(
    JobDetailData
  );
  return addedReading;
};

const getJobDetailsService = async (jobDetailId: string) => {
  const reading = await jobDetailsMethods.getJobDetailsMethod(jobDetailId);
  return reading;
};

const updateJobDetailsService = async (
  JobDetailId: string,
  updatedJobDetail: JobDetailsInterface
) => {
  const updatedReadings = await jobDetailsMethods.updateJobDetailsMethod(
    JobDetailId,
    updatedJobDetail
  );
  return updatedReadings;
};

const deleteJobDetailService = async (JobDetailId: string) => {
  const result = await jobDetailsMethods.deleteJobDetailMethod(JobDetailId);
  return result;
};

export {
  createNewJobDetailService,
  getJobDetailsService,
  updateJobDetailsService,
  deleteJobDetailService,
};
