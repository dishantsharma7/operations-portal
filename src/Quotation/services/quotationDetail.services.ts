import * as quotationDetailsMethods from "../methods/quotationDetails.methods";
import { QuotationDetailsInterface } from "../models/quotationDetails.models";

const createNewQuotationDetailService = async (
  QuotationDetailData: QuotationDetailsInterface
) => {
  const addedReading =
    await quotationDetailsMethods.createNewQuotationDetailsMethod(
      QuotationDetailData
    );
  return addedReading;
};

const getQuotationDetailsService = async (QuotationDetailId: string) => {
  const reading = await quotationDetailsMethods.getQuotationDetailsMethod(
    QuotationDetailId
  );
  return reading;
};

const updateQuotationDetailsService = async (
  QuotationDetailId: string,
  updatedQuotationDetail: QuotationDetailsInterface
) => {
  const updatedReadings =
    await quotationDetailsMethods.updateQuotationDetailsMethod(
      QuotationDetailId,
      updatedQuotationDetail
    );
  return updatedReadings;
};

const deleteQuotationDetailService = async (QuotationDetailId: string) => {
  const result = await quotationDetailsMethods.deleteQuotationDetailMethod(
    QuotationDetailId
  );
  return result;
};

export {
  createNewQuotationDetailService,
  getQuotationDetailsService,
  updateQuotationDetailsService,
  deleteQuotationDetailService,
};
