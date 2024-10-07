import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import { jobCommunicationRouter } from "./JobCommunications/jobCommunication.routes";
import { jobDetailsRouter } from "./JobDetails/jobDetails.routes";
import { jobFilesRouter } from "./JobFiles/jobFiles.routes";
const jobRouter = express.Router();

jobRouter.get("/", (req: Request, res: Response) => {
  const message = "Job routes are working";
  new SuccessMsgResponse(message).send(res);
});

jobRouter.use("/job-communications", jobCommunicationRouter);
jobRouter.use("/job-details", jobDetailsRouter);
jobRouter.use("/job-files", jobFilesRouter);

export { jobRouter };
