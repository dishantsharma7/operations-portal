import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as jobFilesController from "./controllers/jobFiles.controller";
import {
  isRequestValidated,
  validateCreateJobFileRequest,
} from "./middlewares/jobFilesValidator";
const jobFilesRouter = express.Router();

jobFilesRouter.get("/", (req: Request, res: Response) => {
  const message = "Job Files routes are working";
  new SuccessMsgResponse(message).send(res);
});

jobFilesRouter.post(
  "/create-job-file",
  validateCreateJobFileRequest,
  isRequestValidated,
  jobFilesController.createNewJobFileController
);

jobFilesRouter.get("/get-job-files", jobFilesController.getJobFileController);
jobFilesRouter.patch(
  "/update-job-files",
  jobFilesController.updateJobFileController
);
jobFilesRouter.delete(
  "/delete-job-files",
  jobFilesController.deleteJobFileController
);

export { jobFilesRouter };
