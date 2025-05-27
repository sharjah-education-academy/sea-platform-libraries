import { IPermission } from "../../dto/permission";

export enum PermissionKeys {
  // Admin
  ManageAccounts = "manage-accounts",
  ManageAccountsRead = "manage-accounts-read",
  ManageAccountsCreate = "manage-accounts-create",
  ManageAccountsChangePassword = "manage-accounts-change-password",
  ManageAccountsUpdateDetails = "manage-accounts-update-details",
  ManageAccountsDelete = "manage-accounts-delete",
  ManageAccountsSoftDelete = "manage-accounts-soft-delete",
  ManageAccountsForceDelete = "manage-accounts-force-delete",
  ManageAccountsRestore = "manage-accounts-restore",
  ManageRoles = "manage-roles",
  ManageRolesRead = "manage-roles-read",
  ManageRolesCreate = "manage-roles-create",
  ManageRolesUpdateDetails = "manage-roles-update-details",
  ManageRolesDelete = "manage-roles-delete",
  ManageApplication = "manage-applications",
  ManageApplicationRead = "manage-applications-read",
  ManageApplicationCreate = "manage-applications-create",
  ManageApplicationUpdateDetails = "manage-applications-update-details",
  ManageApplicationDelete = "manage-applications-delete",

  ManageOrganization = "manage-organization",
  ManageOrganizationCreate = "manage-organization-create",
  ManageOrganizationRead = "manage-organization-read",
  ManageOrganizationUpdateDetails = "manage-organization-update-details",
  ManageOrganizationDelete = "manage-organization-delete",
  ManageDepartment = "manage-department",
  ManageDepartmentCreate = "manage-department-create",
  ManageDepartmentRead = "manage-department-read",
  ManageDepartmentUpdateDetails = "manage-department-update-details",
  ManageDepartmentDelete = "manage-department-delete",

  // User
  StrategyApp = "strategy-app",
  StrategyAppManageContracts = "strategy-app-manage-contracts",
  StrategyAppManageContractsRead = "strategy-app-manage-contracts-read",
  StrategyAppManageContractsCreate = "strategy-app-manage-contracts-create",
  StrategyAppManageContractsUpdateDetails = "strategy-app-manage-contracts-update-details",
  StrategyAppManageContractsDelete = "strategy-app-manage-contracts-delete",
  StrategyAppManageContractTemplates = "strategy-app-manage-contract-templates",
  StrategyAppManageContractTemplatesRead = "strategy-app-manage-contract-templates-read",
  StrategyAppManageContractTemplatesCreate = "strategy-app-manage-contract-templates-create",
  StrategyAppManageContractTemplatesUpdateDetails = "strategy-app-manage-contract-templates-update-details",
  StrategyAppManageContractTemplatesDelete = "strategy-app-manage-contract-templates-delete",
}

export const USER_PERMISSIONS: IPermission[] = [
  {
    key: PermissionKeys.StrategyApp,
    name: "Strategy App",
    isLeaf: true,
  },
];

export const ADMIN_PERMISSIONS: IPermission[] = [
  {
    key: PermissionKeys.ManageOrganization,
    name: "Manage Organization",
    isLeaf: false,
    children: [
      {
        key: PermissionKeys.ManageOrganizationCreate,
        name: "Create Organization",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageOrganizationRead,
        name: "Read Organization",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageOrganizationUpdateDetails,
        name: "Update Organization Details",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageOrganizationDelete,
        name: "Delete Organization",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageDepartment,
        name: "Manage Department",
        isLeaf: false,
        children: [
          {
            key: PermissionKeys.ManageDepartmentCreate,
            name: "Create Department",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ManageDepartmentRead,
            name: "Read Department",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ManageDepartmentUpdateDetails,
            name: "Update Department Details",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ManageDepartmentDelete,
            name: "Delete Department",
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    key: PermissionKeys.ManageAccounts,
    name: "Manage Account",
    isLeaf: false,
    children: [
      {
        key: PermissionKeys.ManageAccountsRead,
        name: "Read Accounts",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageAccountsCreate,
        name: "Create Account",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageAccountsUpdateDetails,
        name: "Update Account Details",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageAccountsChangePassword,
        name: "Change Account Password",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageAccountsDelete,
        name: "Delete Account",
        isLeaf: false,
        children: [
          {
            key: PermissionKeys.ManageAccountsSoftDelete,
            name: "Soft Delete Account",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ManageAccountsForceDelete,
            name: "Force Delete Account",
            isLeaf: true,
          },
        ],
      },
      {
        key: PermissionKeys.ManageAccountsRestore,
        name: "Restore Account",
        isLeaf: true,
      },
    ],
  },
  {
    key: PermissionKeys.ManageRoles,
    name: "Manage Roles",
    isLeaf: false,
    children: [
      {
        key: PermissionKeys.ManageRolesRead,
        name: "Read Roles",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageRolesCreate,
        name: "Create Roles",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageRolesUpdateDetails,
        name: "Update Role Details",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageRolesDelete,
        name: "Delete Role",
        isLeaf: true,
      },
    ],
  },
  {
    key: PermissionKeys.ManageApplication,
    name: "Manage Applications",
    isLeaf: false,
    children: [
      {
        key: PermissionKeys.ManageApplicationRead,
        name: "Read Applications",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageApplicationCreate,
        name: "Create Applications",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageApplicationUpdateDetails,
        name: "Update Application Details",
        isLeaf: true,
      },
      {
        key: PermissionKeys.ManageApplicationDelete,
        name: "Delete Application",
        isLeaf: true,
      },
    ],
  },
];

export const PERMISSIONS = [...USER_PERMISSIONS, ...ADMIN_PERMISSIONS];
