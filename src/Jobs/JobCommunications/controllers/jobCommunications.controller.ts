import { NextFunction, Request, Response } from "express";
import * as jobCommunicationsServices from "../services/jobCommunications.services";

const createNewJobCommunicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JobCommunicationData = req.body;
    const response =
      await jobCommunicationsServices.createNewJobCommunicationService(
        JobCommunicationData
      );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ createNewJobCommunicationController ~ error:", error);
    next(error);
  }
};

const getJobCommunicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobCommunicationId } = req.query;
    const response =
      await jobCommunicationsServices.getJobCommunicationsService(
        jobCommunicationId as string
      );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

const updateJobCommunicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JobCommunicationId } = req.params;
  const updatedJobCommunication = req.body;

  try {
    const response =
      await jobCommunicationsServices.updateJobCommunicationsService(
        JobCommunicationId,
        updatedJobCommunication
      );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ updateJobCommunicationController ~ error:", error);
    next();
  }
};

const deleteJobCommunicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JobCommunicationId } = req.params;
    const response =
      await jobCommunicationsServices.deleteJobCommunicationService(
        JobCommunicationId
      );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

export {
  createNewJobCommunicationController,
  getJobCommunicationController,
  updateJobCommunicationController,
  deleteJobCommunicationController,
};
