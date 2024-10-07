import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import * as writerUserController from "./controllers/auth.controller";
const writerUserRouter = express.Router();

writerUserRouter.get("/", (req: Request, res: Response) => {
  const message = "Writer User routes are working";
  new SuccessMsgResponse(message).send(res);
});

writerUserRouter.post(
  "/register",
  writerUserController.writerRegisterController
);
writerUserRouter.post("/login", writerUserController.writerLoginController);

export { writerUserRouter };
