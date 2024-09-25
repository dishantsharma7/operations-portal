import { NextFunction, Request, Response } from "express";
import * as jobFilesServices from "../services/jobFiles.services";

const createNewJobFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JobFileData = req.body;
    const response = await jobFilesServices.createNewJobFileService(
      JobFileData
    );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ createNewJobFileController ~ error:", error);
    next(error);
  }
};

const getJobFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobFileId } = req.query;
    const response = await jobFilesServices.getJobFilesService(
      jobFileId as string
    );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

const updateJobFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JobFileId } = req.params;
  const updatedJobFile = req.body;

  try {
    const response = await jobFilesServices.updateJobFilesService(
      JobFileId,
      updatedJobFile
    );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ updateJobFileController ~ error:", error);
    next();
  }
};

const deleteJobFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JobFileId } = req.params;
    const response = await jobFilesServices.deleteJobFileService(JobFileId);
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

export {
  createNewJobFileController,
  getJobFileController,
  updateJobFileController,
  deleteJobFileController,
};
