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

  // User
  ContractsApp = "contracts-app",
  ContractsAppManageContracts = "contracts-app-manage-contracts",
  ContractsAppManageContractsRead = "contracts-app-manage-contracts-read",
  ContractsAppManageContractsCreate = "contracts-app-manage-contracts-create",
  ContractsAppManageContractsUpdateDetails = "contracts-app-manage-contracts-update-details",
  ContractsAppManageContractsDelete = "contracts-app-manage-contracts-delete",
  ContractsAppManageContractTemplates = "contracts-app-manage-contract-templates",
  ContractsAppManageContractTemplatesRead = "contracts-app-manage-contract-templates-read",
  ContractsAppManageContractTemplatesCreate = "contracts-app-manage-contract-templates-create",
  ContractsAppManageContractTemplatesUpdateDetails = "contracts-app-manage-contract-templates-update-details",
  ContractsAppManageContractTemplatesDelete = "contracts-app-manage-contract-templates-delete",
}

export const USER_PERMISSIONS: IPermission[] = [
  {
    key: PermissionKeys.ContractsApp,
    name: "Contract App",
    isLeaf: false,
    children: [
      {
        key: PermissionKeys.ContractsAppManageContracts,
        name: "Manage My Contracts",
        isLeaf: false,
        children: [
          {
            key: PermissionKeys.ContractsAppManageContractsRead,
            name: "Read My Contracts",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractsCreate,
            name: "Create Contract",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractsUpdateDetails,
            name: "Update Contract",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractsDelete,
            name: "Delete Contract",
            isLeaf: true,
          },
        ],
      },
      {
        key: PermissionKeys.ContractsAppManageContractTemplates,
        name: "Manage Contract Templates",
        isLeaf: false,
        children: [
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesRead,
            name: "Read Contract Templates",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesCreate,
            name: "Create Contract Template",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesUpdateDetails,
            name: "Update Contract Template",
            isLeaf: true,
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesDelete,
            name: "Delete Contract Template",
            isLeaf: true,
          },
        ],
      },
    ],
  },
];

export const ADMIN_PERMISSIONS: IPermission[] = [
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
