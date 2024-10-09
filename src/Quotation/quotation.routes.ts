import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import * as quotationController from "./controllers/quotationDetails.controller";
import {
  isRequestValidated,
  validateCreateQuotationRequest,
} from "./middlewares/quotationValidator";
const quotationRouter = express.Router();

quotationRouter.get("/", (req: Request, res: Response) => {
  const message = "Quotation routes are working";
  new SuccessMsgResponse(message).send(res);
});

quotationRouter.post(
  "/create-quotation",
  validateCreateQuotationRequest,
  isRequestValidated,
  quotationController.createNewQuotationDetailController
);
quotationRouter.get(
  "/get-quotation",
  quotationController.getQuotationDetailController
);

quotationRouter.patch(
  "/update-quotation",
  quotationController.updateQuotationDetailController
);

quotationRouter.delete(
  "/delete-quotation",
  quotationController.deleteQuotationDetailController
);

export { quotationRouter };
