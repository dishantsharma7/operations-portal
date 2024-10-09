import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as writerUserController from "./controllers/auth.controller";
import {
  isRequestValidated,
  validateWriterRegisterRequest,
} from "./middleware/writerValidator";
const writerUserRouter = express.Router();

writerUserRouter.get("/", (req: Request, res: Response) => {
  const message = "Writer User routes are working";
  new SuccessMsgResponse(message).send(res);
});

writerUserRouter.post(
  "/register",
  validateWriterRegisterRequest,
  isRequestValidated,
  writerUserController.writerRegisterController
);
writerUserRouter.post("/login", writerUserController.writerLoginController);

export { writerUserRouter };
