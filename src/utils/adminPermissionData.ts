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
  {
    slug: 'restaurant_role_access',
    accessPermissionName: 'Restaurant Role Access',
  },
  {
    slug: 'restaurant_user_access',
    accessPermissionName: 'Restaurant User Access',
  },
  {
    slug: 'outlets_access',
    accessPermissionName: 'Outlets Access',
  },
  {
    slug: 'vendor_management_access',
    accessPermissionName: 'Vendor Management Access',
  },
  {
    slug: 'waste_management_access',
    accessPermissionName: 'Waste Management Access',
  },
  {
    slug: 'non_chargeable_items_management_access',
    accessPermissionName: 'Non Cahrgeable Items Management Access',
  },
  {
    slug: 'store_sku_access',
    accessPermissionName: 'Store SKU Access',
  },
  {
    slug: 'restaurant_sku_access',
    accessPermissionName: 'Restaurant SKU Access',
  },
  {
    slug: 'vendor_management_access',
    accessPermissionName: 'Vendor Management Access',
  },

  
];
export const restaurantPermissions = [
  {
    slug: 'vendor_management_access',
    accessPermissionName: 'Vendor Management Access',
  },
  {
    slug: 'waste_management_access',
    accessPermissionName: 'Waste Management Access',
  },
  {
    slug: 'non_chargeable_items_management_access',
    accessPermissionName: 'Non Cahrgeable Items Management Access',
  },
  {
    slug: 'store_sku_access',
    accessPermissionName: 'Store SKU Access',
  },
  {
    slug: 'restaurant_sku_access',
    accessPermissionName: 'Restaurant SKU Access',
  },
  {
    slug: 'restaurant_employee_access',
    accessPermissionName: 'Restaurant Employee Access',
  },
  {
    slug: 'vendor_management_access',
    accessPermissionName: 'Vendor Management Access',
  },
  {
    slug: 'chef_requisition_access',
    accessPermissionName: 'Chef Requisition Access',
  },
  {
    slug: 'store_item_issue_access',
    accessPermissionName: 'Store Item Issue Access',
  },
  {
    slug: 'store_purchase_access',
    accessPermissionName: 'Store Purchase Access',
  },
  {
    slug: 'gas_readings_access',
    accessPermissionName: 'Gas Readings Access',
  },
  {
    slug: 'store_inventory_access',
    accessPermissionName: 'Store Inventory Access',
  },
];
