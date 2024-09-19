import prisma_client from '../../config/prisma';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';
import { comparePassword } from '../../core/utils';
import * as authMethods from '../methods/auth.methods';
import { writerRegisterInterface} from '../models/writer.models';

// Writer Company Users
const writerRegisterService = async (writerRegistrationData: writerRegisterInterface) => {
  if (writerRegistrationData.zipcode) {
    const zipCode = Number(writerRegistrationData.zipcode);
    writerRegistrationData.zipcode = zipCode;
  }

  const registrationResponse = await authMethods.RegisterWriterMethod(writerRegistrationData);
  return registrationResponse;
};

const writerLoginService = async (emailAddress: string, password: string) => {
  const writer = await prisma_client.writer_user.findUnique({
    where: { emailAddress: emailAddress }
  });
  return writer;
};

export { writerRegisterService, writerLoginService };
