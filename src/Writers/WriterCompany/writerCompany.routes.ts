import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as writerCompanyController from "./controllers/auth.controller";
import {
  isRequestValidated,
  validateWriterCompanyRegisterRequest,
} from "./middleware/writerCompanyValidator";
const writerCompanyUserRouter = express.Router();

writerCompanyUserRouter.get("/", (req: Request, res: Response) => {
  const message = "Writer Company User routes are working";
  new SuccessMsgResponse(message).send(res);
});

writerCompanyUserRouter.post(
  "/register",
  validateWriterCompanyRegisterRequest,
  isRequestValidated,
  writerCompanyController.writerCompanyRegisterController
);
writerCompanyUserRouter.post(
  "/login",
  writerCompanyController.writerCompanyLoginController
);

export { writerCompanyUserRouter };
