import { NextFunction, Request, Response } from "express";
import * as quotationDetailsServices from "../services/quotationDetail.services";

const createNewQuotationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const QuotationDetailData = req.body;
    const response =
      await quotationDetailsServices.createNewQuotationDetailService(
        QuotationDetailData
      );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ createNewQuotationDetailController ~ error:", error);
    next(error);
  }
};

const getQuotationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { QuotationDetailId } = req.query;
    const response = await quotationDetailsServices.getQuotationDetailsService(
      QuotationDetailId as string
    );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

const updateQuotationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { QuotationDetailId } = req.params;
  const updatedQuotationDetail = req.body;

  try {
    const response =
      await quotationDetailsServices.updateQuotationDetailsService(
        QuotationDetailId,
        updatedQuotationDetail
      );
    return response.send(res);
  } catch (error) {
    console.log("🚀 ~ updateQuotationDetailController ~ error:", error);
    next();
  }
};

const deleteQuotationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { QuotationDetailId } = req.params;
    const response =
      await quotationDetailsServices.deleteQuotationDetailService(
        QuotationDetailId
      );
    return response.send(res);
  } catch (error) {
    next(error);
  }
};

export {
  createNewQuotationDetailController,
  getQuotationDetailController,
  updateQuotationDetailController,
  deleteQuotationDetailController,
};
