export interface writerRegisterInterface {

  writerCompanyID: string;
  firstName: string;
  lastName?: string;
  emailAddress: string;
  password: string;
  username: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipcode: number;
  countryCode: string;
  gender: string;
  dateOfBirth: string;
  userImage: string;
}

export interface writerDetailsInterface {

  writerCompanyID: string;
  firstName: string;
  lastName?: string;
  emailAddress: string;
  password: string;
  username: string;
  phoneNumber: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: number;
  countryCode?: string;
  gender?: string;
  dateOfBirth?: string;
  userImage?: string;
}

