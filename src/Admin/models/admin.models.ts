export interface createAdminAccessPermissionsInterface {
  accessPermissionName: string;
  slug: string;
}

export interface createAdminRolesInterface {
  roleName: string; //@unique
  slug: string;
  permissions: { id: string }[];
}

export interface adminRegisterInterface {

  firstName: string;
  lastName?: string;
  emailAddress: string;
  password: string;
  username: string;
  phoneNumber: string;
  admin_rolesId: string;
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

export interface adminDetailsInterface {
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
  admin_rolesId: string;
  decodeToken: {
    username: string;
    id: number;
    roleName: string;
  };
}


export interface expenseDocumentCategoryInterface {
  categoryName: string
}
