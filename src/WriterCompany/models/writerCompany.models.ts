export interface writerCompanyRegisterInterface {

  companyName: string;
  POCFirstName: string;
  POCLastName?: string;
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
}

export interface writerCompanyDetailsInterface {
  POCFirstName: string;
  POCLastName?: string;
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

