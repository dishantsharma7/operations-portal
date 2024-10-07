import prisma_client from "../../config/prisma";
import { AuthFailureError, BadRequestError } from "../../core/ApiError";
import { comparePassword } from "../../core/utils";
import * as authMethods from "../methods/auth.methods";
import {
  adminRegisterInterface,
  createAdminAccessPermissionsInterface,
  createAdminRolesInterface,
} from "../models/admin.models";

// Roles and Permissions
const createPermissionService = async (
  permissionData: createAdminAccessPermissionsInterface
) => {
  if (!permissionData?.accessPermissionName) {
    throw new BadRequestError("Invalid input");
  }
  const createPermissionResponse = await authMethods.createPermissionMethod(
    permissionData
  );
  return createPermissionResponse;
};

const createRoleService = async (roleData: createAdminRolesInterface) => {
  if (!roleData?.roleName || !roleData?.permissions) {
    throw new BadRequestError("Invalid input");
  }
  const createRoleResponse = await authMethods.createRoleMethod(roleData);
  return createRoleResponse;
};

const getAllPermissionService = async () => {
  const fetchAllPermissionResponse = await authMethods.getAllPermissionMethod();
  return fetchAllPermissionResponse;
};

const getAllRoleService = async () => {
  const fetchAllRoleResponse = await authMethods.getAllRoleMethod();
  return fetchAllRoleResponse;
};

// Admin Users
const adminRegisterService = async (
  adminRegistrationData: adminRegisterInterface
) => {
  // const { admin_rolesId } = adminRegistrationData;
  // const roleExists = await prisma_client.admin_roles.findUnique({
  //   where: { id: admin_rolesId },
  // });
  // if (!roleExists) {
  //   throw new BadRequestError("Role doesn't exist");
  // }
  // if (adminRegistrationData.zipcode) {
  //   const zipCode = Number(adminRegistrationData.zipcode);
  //   adminRegistrationData.zipcode = zipCode;
  // }

  // if (adminRegistrationData.dateOfBirth) {
  //   const dateOfbirth = new Date(
  //     adminRegistrationData.dateOfBirth
  //   ).toISOString();
  //   adminRegistrationData.dateOfBirth = dateOfbirth;
  // }

  const registrationResponse = await authMethods.RegisterAdminMethod(
    adminRegistrationData
  );
  return registrationResponse;
};

const adminLoginService = async (emailAddress: string, password: string) => {
  const admin = await prisma_client.admin_user.findUnique({
    where: { emailAddress: emailAddress },
    include: {
      adminRole: {
        include: {
          admin_permissions: {
            select: {
              accessPermissionName: true,
              slug: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return admin;
};

export {
  createPermissionService,
  createRoleService,
  getAllPermissionService,
  getAllRoleService,
  adminRegisterService,
  adminLoginService,
};
