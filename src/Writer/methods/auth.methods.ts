import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { BadRequestResponse, FailureMsgResponse, InternalErrorResponse, SuccessResponse } from '../../core/ApiResponse';
import { hashPassword } from '../../core/utils';
import { writerRegisterInterface } from '../models/writer.models';

//   Writer Company User

const RegisterWriterMethod = async (writerRegistrationData: writerRegisterInterface) => {
  console.log(writerRegistrationData, 'writerRegistrationData');
  const existingUsername = await prisma_client.writer_company_user.findFirst({
    where: { username: writerRegistrationData.username },
  });
  if (existingUsername) {
    throw new BadRequestError('Writer Company not registered: Username Already Taken');
  }
  const existingEmail = await prisma_client.writer_company_user.findFirst({
    where: { emailAddress: writerRegistrationData.emailAddress },
  });
  if (existingEmail) {
    throw new BadRequestError('Writer Company not registered: Email Already Taken');
  }
  const existingPhoneNumber = await prisma_client.writer_company_user.findFirst({
    where: { phoneNumber: writerRegistrationData.phoneNumber },
  });
  if (existingPhoneNumber) {
    throw new BadRequestError('Writer Company not registered: Phone Number Already Taken');
  }
  const hashedpass: string = await hashPassword(writerRegistrationData.password);
  const registeredUser = await prisma_client.writer_company_user.create({
    data: { ...writerRegistrationData, password: hashedpass },
  });
  if (!registeredUser) {
    throw new BadRequestError('Failed to register new Writer Company');
  }
  return new SuccessResponse('Writer Company registered successfully', registeredUser);
};

export {  RegisterWriterMethod };
