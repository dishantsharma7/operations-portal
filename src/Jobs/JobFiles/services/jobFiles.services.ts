import * as jobFilesMethods from "../methods/jobFiles.methods";
import { JobFilesInterface } from "../models/jobFiles.models";

const createNewJobFileService = async (JobFileData: JobFilesInterface) => {
  const addedReading = await jobFilesMethods.createNewJobFilesMethod(
    JobFileData
  );
  return addedReading;
};

const getJobFilesService = async (jobFileId: string) => {
  const reading = await jobFilesMethods.getJobFilesMethod(jobFileId);
  return reading;
};

const updateJobFilesService = async (
  jobFileId: string,
  updatedJobFile: JobFilesInterface
) => {
  const updatedReadings = await jobFilesMethods.updateJobFilesMethod(
    jobFileId,
    updatedJobFile
  );
  return updatedReadings;
};

const deleteJobFileService = async (jobFileId: string) => {
  const result = await jobFilesMethods.deleteJobFileMethod(jobFileId);
  return result;
};

export {
  createNewJobFileService,
  getJobFilesService,
  updateJobFilesService,
  deleteJobFileService,
};
