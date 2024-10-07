import prisma_client from "../../../config/prisma";
import { AuthFailureError, BadRequestError } from "../../../core/ApiError";
import { comparePassword } from "../../../core/utils";
import * as authMethods from "../methods/auth.methods";
import { writerCompanyRegisterInterface } from "../models/writerCompany.models";

// Writer Company Users
const writerCompanyRegisterService = async (
  writerCompanyRegistrationData: writerCompanyRegisterInterface
) => {
  if (writerCompanyRegistrationData.zipcode) {
    const zipCode = Number(writerCompanyRegistrationData.zipcode);
    writerCompanyRegistrationData.zipcode = zipCode;
  }

  const registrationResponse = await authMethods.RegisterWriterCompanyMethod(
    writerCompanyRegistrationData
  );
  return registrationResponse;
};

const writerCompanyLoginService = async (
  emailAddress: string,
  password: string
) => {
  const writerCompany = await prisma_client.writer_company_user.findUnique({
    where: { emailAddress: emailAddress },
  });
  return writerCompany;
};

export { writerCompanyRegisterService, writerCompanyLoginService };
