import prisma_client from '../../config/prisma';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';
import { comparePassword } from '../../core/utils';
import * as authMethods from '../methods/auth.methods';
import { clientRegisterInterface} from '../models/client.models';

// Client Users
const clientRegisterService = async (clientRegistrationData: clientRegisterInterface) => {
  if (clientRegistrationData.zipcode) {
    const zipCode = Number(clientRegistrationData.zipcode);
    clientRegistrationData.zipcode = zipCode;
  }

  if (clientRegistrationData.dateOfBirth) {
    const dateOfbirth = new Date(clientRegistrationData.dateOfBirth).toISOString();
    clientRegistrationData.dateOfBirth = dateOfbirth;
  }

  const registrationResponse = await authMethods.RegisterClientMethod(clientRegistrationData);
  return registrationResponse;
};

const clientLoginService = async (emailAddress: string, password: string) => {
  const client = await prisma_client.client_user.findUnique({
    where: { emailAddress: emailAddress }
  });
  return client;
};

export { clientRegisterService, clientLoginService };
