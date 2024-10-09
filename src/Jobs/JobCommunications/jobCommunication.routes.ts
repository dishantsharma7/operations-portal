import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as jobCommunicationController from "./controllers/jobCommunications.controller";
import {
  isRequestValidated,
  validateCreateJobCommunicationRequest,
} from "./middlewares/jobCommunicationValidator";
const jobCommunicationRouter = express.Router();

jobCommunicationRouter.get("/", (req: Request, res: Response) => {
  const message = "Job Communication routes are working";
  new SuccessMsgResponse(message).send(res);
});
jobCommunicationRouter.post(
  "/create",
  validateCreateJobCommunicationRequest,
  isRequestValidated,
  jobCommunicationController.createNewJobCommunicationController
);
jobCommunicationRouter.get(
  "/get",
  jobCommunicationController.getJobCommunicationController
);
jobCommunicationRouter.patch(
  "/update",
  jobCommunicationController.updateJobCommunicationController
);
jobCommunicationRouter.delete(
  "/delete",
  jobCommunicationController.deleteJobCommunicationController
);

export { jobCommunicationRouter };
