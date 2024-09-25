import * as jobCommunicationsMethods from "../methods/jobCommunications.methods";
import { JobCommunicationsInterface } from "../models/jobCommunications.models";

const createNewJobCommunicationService = async (
  JobCommunicationData: JobCommunicationsInterface
) => {
  const addedReading =
    await jobCommunicationsMethods.createNewJobCommunicationsMethod(
      JobCommunicationData
    );
  return addedReading;
};

const getJobCommunicationsService = async (jobCommunicationId: string) => {
  const reading = await jobCommunicationsMethods.getJobCommunicationsMethod(
    jobCommunicationId
  );
  return reading;
};

const updateJobCommunicationsService = async (
  JobCommunicationId: string,
  updatedJobCommunication: JobCommunicationsInterface
) => {
  const updatedReadings =
    await jobCommunicationsMethods.updateJobCommunicationsMethod(
      JobCommunicationId,
      updatedJobCommunication
    );
  return updatedReadings;
};

const deleteJobCommunicationService = async (JobCommunicationId: string) => {
  const result = await jobCommunicationsMethods.deleteJobCommunicationMethod(
    JobCommunicationId
  );
  return result;
};

export {
  createNewJobCommunicationService,
  getJobCommunicationsService,
  updateJobCommunicationsService,
  deleteJobCommunicationService,
};
