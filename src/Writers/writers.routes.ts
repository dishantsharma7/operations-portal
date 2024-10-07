import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import { writerUserRouter } from "./Writer/writer.routes";
import { writerCompanyUserRouter } from "./WriterCompany/writerCompany.routes";
import * as writerUserController from "./Writer/controllers/auth.controller";
import * as writerCompanyUserController from "./WriterCompany/controllers/auth.controller";

const writerRouter = express.Router();

writerRouter.get("/", (req: Request, res: Response) => {
  const message = "Writer routes are working";
  new SuccessMsgResponse(message).send(res);
});

writerRouter.use("/writer-user", writerUserRouter);
writerRouter.use("/writer-company-user", writerCompanyUserRouter);

export { writerRouter };
