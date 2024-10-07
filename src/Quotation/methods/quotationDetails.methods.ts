import { BadRequestError } from "../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import prisma_client from "../../prisma";
import { QuotationDetailsInterface } from "../models/quotationDetails.models";

const createNewQuotationDetailsMethod = async (
  QuotationDetailData: QuotationDetailsInterface
) => {
  console.log(
    "🚀 ~ createNewQuotationDetailsMethod ~ QuotationDetailData:",
    QuotationDetailData
  );
  //   const existingQuotation = await prisma_client.quotation_details.findFirst({
  //     where: { date: QuotationDetailData.date },
  //   });

  //   if (existingReading) {
  //     throw new BadRequestError("Quotation Detail for this date already exists!");
  //   }

  const addedReading = await prisma_client.quotation_details.create({
    data: {
      ...QuotationDetailData,
    },
    // data: { ...QuotationDetailData },
  });

  if (!addedReading) {
    throw new BadRequestError("Failed to add new Quotation Detail ");
  }

  return new SuccessResponse("Added new Quotation Detail", addedReading);
};

const getQuotationDetailsMethod = async (QuotationDetailId: string) => {
  const QuotationDetailsData = await prisma_client.quotation_details.findMany({
    where: {
      id: QuotationDetailId,
    },
  });

  if (!QuotationDetailsData) {
    throw new BadRequestError("No Quotation Detail found!");
  }

  return new SuccessResponse("Fetched Quotation Detail ", QuotationDetailsData);
};

const updateQuotationDetailsMethod = async (
  QuotationDetailId: string,
  updatedQuotationDetail: QuotationDetailsInterface
) => {
  console.log(
    "🚀 ~ updateQuotationDetailsMethod ~ updatedQuotationDetail:",
    updatedQuotationDetail
  );
  const existingQuotationDetailData =
    await prisma_client.quotation_details.findFirst({
      where: { id: QuotationDetailId },
    });

  if (!existingQuotationDetailData) {
    throw new BadRequestError("Quotation Detail does not exist!");
  }

  const updatedQuotationDetailData =
    await prisma_client.quotation_details.update({
      where: { id: QuotationDetailId },
      data: {
        ...updatedQuotationDetail,
      },
    });

  if (!updatedQuotationDetailData) {
    throw new BadRequestError("Failed to update Quotation Detail");
  }

  return new SuccessResponse(
    "Quotation Detail updated successfully",
    updatedQuotationDetailData
  );
};

const deleteQuotationDetailMethod = async (QuotationDetailId: string) => {
  const existingQuotationDetail =
    await prisma_client.quotation_details.findFirst({
      where: { id: QuotationDetailId },
    });

  if (!existingQuotationDetail) {
    throw new BadRequestError("Quotation Detail does not exist!");
  } else {
    await prisma_client.quotation_details.delete({
      where: { id: QuotationDetailId },
    });

    return new SuccessMsgResponse("Quotation Detail deleted successfully");
  }
};

export {
  createNewQuotationDetailsMethod,
  getQuotationDetailsMethod,
  updateQuotationDetailsMethod,
  deleteQuotationDetailMethod,
};
