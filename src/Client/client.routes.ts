import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import * as clientController from "./controllers/auth.controller";

const clientRouter = express.Router();

clientRouter.get("/", (req: Request, res: Response) => {
  const message = "Client routes are working";
  new SuccessMsgResponse(message).send(res);
});

clientRouter.post("/register", clientController.clientRegisterController);

export { clientRouter };
