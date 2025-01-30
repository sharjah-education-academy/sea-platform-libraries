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
    children: [
      {
        key: PermissionKeys.ContractsAppManageContracts,
        name: "Manage My Contracts",
        children: [
          {
            key: PermissionKeys.ContractsAppManageContractsRead,
            name: "Read My Contracts",
          },
          {
            key: PermissionKeys.ContractsAppManageContractsCreate,
            name: "Create Contract",
          },
          {
            key: PermissionKeys.ContractsAppManageContractsUpdateDetails,
            name: "Update Contract",
          },
          {
            key: PermissionKeys.ContractsAppManageContractsDelete,
            name: "Delete Contract",
          },
        ],
      },
      {
        key: PermissionKeys.ContractsAppManageContractTemplates,
        name: "Manage Contract Templates",
        children: [
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesRead,
            name: "Read Contract Templates",
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesCreate,
            name: "Create Contract Template",
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesUpdateDetails,
            name: "Update Contract Template",
          },
          {
            key: PermissionKeys.ContractsAppManageContractTemplatesDelete,
            name: "Delete Contract Template",
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
    children: [
      {
        key: PermissionKeys.ManageAccountsRead,
        name: "Read Accounts",
      },
      {
        key: PermissionKeys.ManageAccountsCreate,
        name: "Create Account",
      },
      {
        key: PermissionKeys.ManageAccountsUpdateDetails,
        name: "Update Account Details",
      },
      {
        key: PermissionKeys.ManageAccountsChangePassword,
        name: "Change Account Password",
      },
      {
        key: PermissionKeys.ManageAccountsDelete,
        name: "Delete Account",
        children: [
          {
            key: PermissionKeys.ManageAccountsSoftDelete,
            name: "Soft Delete Account",
          },
          {
            key: PermissionKeys.ManageAccountsForceDelete,
            name: "Force Delete Account",
          },
        ],
      },
      {
        key: PermissionKeys.ManageAccountsRestore,
        name: "Restore Account",
      },
    ],
  },
  {
    key: PermissionKeys.ManageRoles,
    name: "Manage Roles",
    children: [
      {
        key: PermissionKeys.ManageRolesRead,
        name: "Read Roles",
      },
      {
        key: PermissionKeys.ManageRolesCreate,
        name: "Create Roles",
      },
      {
        key: PermissionKeys.ManageRolesUpdateDetails,
        name: "Update Role Details",
      },
      {
        key: PermissionKeys.ManageRolesDelete,
        name: "Delete Role",
      },
    ],
  },
  {
    key: PermissionKeys.ManageApplication,
    name: "Manage Applications",
    children: [
      {
        key: PermissionKeys.ManageApplicationRead,
        name: "Read Applications",
      },
      {
        key: PermissionKeys.ManageApplicationCreate,
        name: "Create Applications",
      },
      {
        key: PermissionKeys.ManageApplicationUpdateDetails,
        name: "Update Application Details",
      },
      {
        key: PermissionKeys.ManageApplicationDelete,
        name: "Delete Application",
      },
    ],
  },
];

export const PERMISSIONS = [...USER_PERMISSIONS, ...ADMIN_PERMISSIONS];
