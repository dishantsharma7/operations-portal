import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { BadRequestResponse, FailureMsgResponse, InternalErrorResponse, SuccessResponse } from '../../core/ApiResponse';
import { hashPassword } from '../../core/utils';
import { clientRegisterInterface } from '../models/client.models';

//   Client User

const RegisterClientMethod = async (clientRegistrationData: clientRegisterInterface) => {
  console.log(clientRegistrationData, 'clientRegistrationData');
  const existingUsername = await prisma_client.client_user.findFirst({
    where: { username: clientRegistrationData.username },
  });
  if (existingUsername) {
    throw new BadRequestError('Client not registered: Username Already Taken');
  }
  const existingEmail = await prisma_client.client_user.findFirst({
    where: { emailAddress: clientRegistrationData.emailAddress },
  });
  if (existingEmail) {
    throw new BadRequestError('Client not registered: Email Already Taken');
  }
  const existingPhoneNumber = await prisma_client.client_user.findFirst({
    where: { phoneNumber: clientRegistrationData.phoneNumber },
  });
  if (existingPhoneNumber) {
    throw new BadRequestError('Client not registered: Phone Number Already Taken');
  }
  const hashedpass: string = await hashPassword(clientRegistrationData.password);
  const registeredUser = await prisma_client.client_user.create({
    data: { ...clientRegistrationData, password: hashedpass },
  });
  if (!registeredUser) {
    throw new BadRequestError('Failed to register new client');
  }
  return new SuccessResponse('Client registered successfully', registeredUser);
};

export {  RegisterClientMethod };
