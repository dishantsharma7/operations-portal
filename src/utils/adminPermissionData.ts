import { randomUUID } from 'crypto';
import { createAdminAccessPermissionsInterface } from '../Admin/models/admin.models';

export const adminPermissions = [
  {
    slug: 'admin_role_access',
    accessPermissionName: 'Admin Role Access',
  },
  {
    slug: 'admin_user_access',
    accessPermissionName: 'Admin User Access',
  }, 
];
