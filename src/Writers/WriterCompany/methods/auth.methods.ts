import prisma_client from "../../../config/prisma";
import { BadRequestError } from "../../../core/ApiError";
import {
  BadRequestResponse,
  FailureMsgResponse,
  InternalErrorResponse,
  SuccessResponse,
} from "../../../core/ApiResponse";
import { hashPassword } from "../../../core/utils";
import { writerCompanyRegisterInterface } from "../models/writerCompany.models";

//   Writer Company User

const RegisterWriterCompanyMethod = async (
  writerCompanyRegistrationData: writerCompanyRegisterInterface
) => {
  console.log(writerCompanyRegistrationData, "writerCompanyRegistrationData");
  const existingUsername = await prisma_client.writer_company_user.findFirst({
    where: { username: writerCompanyRegistrationData.username },
  });
  if (existingUsername) {
    throw new BadRequestError(
      "Writer Company not registered: Username Already Taken"
    );
  }
  const existingEmail = await prisma_client.writer_company_user.findFirst({
    where: { emailAddress: writerCompanyRegistrationData.emailAddress },
  });
  if (existingEmail) {
    throw new BadRequestError(
      "Writer Company not registered: Email Already Taken"
    );
  }
  const existingPhoneNumber = await prisma_client.writer_company_user.findFirst(
    {
      where: { phoneNumber: writerCompanyRegistrationData.phoneNumber },
    }
  );
  if (existingPhoneNumber) {
    throw new BadRequestError(
      "Writer Company not registered: Phone Number Already Taken"
    );
  }
  const hashedpass: string = await hashPassword(
    writerCompanyRegistrationData.password
  );
  const registeredUser = await prisma_client.writer_company_user.create({
    data: { ...writerCompanyRegistrationData, password: hashedpass },
  });
  if (!registeredUser) {
    throw new BadRequestError("Failed to register new Writer Company");
  }
  return new SuccessResponse(
    "Writer Company registered successfully",
    registeredUser
  );
};

export { RegisterWriterCompanyMethod };
