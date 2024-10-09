import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as jobDetailsController from "./controllers/jobDetails.controller";
import {
  isRequestValidated,
  validateCreateJobDetailRequest,
} from "./middlewares/jobDetailsValidator";
const jobDetailsRouter = express.Router();

jobDetailsRouter.get("/", (req: Request, res: Response) => {
  const message = "Job details routes are working";
  new SuccessMsgResponse(message).send(res);
});

jobDetailsRouter.post(
  "/create-job-detail",
  validateCreateJobDetailRequest,
  isRequestValidated,
  jobDetailsController.createNewJobDetailController
);
jobDetailsRouter.get(
  "/get-job-details",
  jobDetailsController.getJobDetailController
);
jobDetailsRouter.get(
  "/update-job-detail",
  jobDetailsController.updateJobDetailController
);
jobDetailsRouter.get(
  "/delete-job-detail",
  jobDetailsController.deleteJobDetailController
);
export { jobDetailsRouter };
