export interface writerCompanyRegisterInterface {
  companyName: string;
  firstName: string;
  lastName: string;
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
  createdBy: string;
  updatedBy: string;
}

export interface writerCompanyDetailsInterface {
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
}
