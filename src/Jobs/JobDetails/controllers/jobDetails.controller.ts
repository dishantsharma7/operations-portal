import { NextFunction, Request, Response } from "express";
import * as jobDetailsServices from "../services/jobDetail.services";

const createNewJobDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JobDetailData = req.body;
    const response = await jobDetailsServices.createNewJobDetailService(
      JobDetailData
    );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ createNewJobDetailController ~ error:", error);
    next(error);
  }
};

const getJobDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobDetailId } = req.query;
    const response = await jobDetailsServices.getJobDetailsService(
      jobDetailId as string
    );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

const updateJobDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JobDetailId } = req.params;
  const updatedJobDetail = req.body;

  try {
    const response = await jobDetailsServices.updateJobDetailsService(
      JobDetailId,
      updatedJobDetail
    );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ updateJobDetailController ~ error:", error);
    next();
  }
};

const deleteJobDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { JobDetailId } = req.params;
    const response = await jobDetailsServices.deleteJobDetailService(
      JobDetailId
    );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

export {
  createNewJobDetailController,
  getJobDetailController,
  updateJobDetailController,
  deleteJobDetailController,
};
