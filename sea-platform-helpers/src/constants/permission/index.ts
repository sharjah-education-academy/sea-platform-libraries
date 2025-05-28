import { IPermission } from "../../dto/permission";
import { ApplicationKeys } from "../application";

export enum PermissionKeys {
  // Admin
  PlatformAdministration = "platform-administration",
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
  ManageApplicationUpdateDetails = "manage-applications-update-details",
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
  ManageGoals = "manage-goals",
  ManageGoalsCreate = "manage-goals-create",
  ManageGoalsRead = "manage-goals-read",
  ManageGoalsUpdateDetails = "manage-goals-update-details",
  ManageGoalsDelete = "manage-goals-delete",
  ManageInitiatives = "manage-initiatives",
  ManageInitiativesCreate = "manage-initiatives-create",
  ManageInitiativesRead = "manage-initiatives-read",
  ManageInitiativesUpdateDetails = "manage-initiatives-update-details",
  ManageInitiativesDelete = "manage-initiatives-delete",
}

export const PERMISSIONS: IPermission[] = [
  // Administration Application
  {
    applicationKey: ApplicationKeys.PlatformAdministrationApplication,
    key: PermissionKeys.PlatformAdministration,
    name: "Platform Administration",
    isLeaf: false,
    children: [
      {
        applicationKey: ApplicationKeys.PlatformAdministrationApplication,
        key: PermissionKeys.ManageOrganization,
        name: "Manage Organization",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageOrganizationCreate,
            name: "Create Organization",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageOrganizationRead,
            name: "Read Organization",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageOrganizationUpdateDetails,
            name: "Update Organization Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageOrganizationDelete,
            name: "Delete Organization",
            isLeaf: true,
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.PlatformAdministrationApplication,
        key: PermissionKeys.ManageDepartment,
        name: "Manage Department",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageDepartmentCreate,
            name: "Create Department",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageDepartmentRead,
            name: "Read Department",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageDepartmentUpdateDetails,
            name: "Update Department Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageDepartmentDelete,
            name: "Delete Department",
            isLeaf: true,
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.PlatformAdministrationApplication,
        key: PermissionKeys.ManageAccounts,
        name: "Manage Account",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsRead,
            name: "Read Accounts",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsCreate,
            name: "Create Account",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsUpdateDetails,
            name: "Update Account Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsChangePassword,
            name: "Change Account Password",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsDelete,
            name: "Delete Account",
            isLeaf: false,
            children: [
              {
                applicationKey:
                  ApplicationKeys.PlatformAdministrationApplication,
                key: PermissionKeys.ManageAccountsSoftDelete,
                name: "Soft Delete Account",
                isLeaf: true,
              },
              {
                applicationKey:
                  ApplicationKeys.PlatformAdministrationApplication,
                key: PermissionKeys.ManageAccountsForceDelete,
                name: "Force Delete Account",
                isLeaf: true,
              },
            ],
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageAccountsRestore,
            name: "Restore Account",
            isLeaf: true,
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.PlatformAdministrationApplication,
        key: PermissionKeys.ManageRoles,
        name: "Manage Roles",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageRolesRead,
            name: "Read Roles",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageRolesCreate,
            name: "Create Roles",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageRolesUpdateDetails,
            name: "Update Role Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageRolesDelete,
            name: "Delete Role",
            isLeaf: true,
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.PlatformAdministrationApplication,
        key: PermissionKeys.ManageApplication,
        name: "Manage Applications",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageApplicationRead,
            name: "Read Applications",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.PlatformAdministrationApplication,
            key: PermissionKeys.ManageApplicationUpdateDetails,
            name: "Update Application Details",
            isLeaf: true,
          },
        ],
      },
    ],
  },

  // Strategy Application
  {
    applicationKey: ApplicationKeys.StrategyApplication,
    key: PermissionKeys.StrategyApp,
    name: "Strategy",
    isLeaf: false,
    children: [
      {
        applicationKey: ApplicationKeys.StrategyApplication,
        key: PermissionKeys.ManageGoals,
        name: "Manage Goals",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageGoalsCreate,
            name: "Create Goal",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageGoalsRead,
            name: "Read Goals",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageGoalsUpdateDetails,
            name: "Update Goal Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageGoalsDelete,
            name: "Delete Goal",
            isLeaf: true,
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.StrategyApplication,
        key: PermissionKeys.ManageInitiatives,
        name: "Manage Initiatives",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageInitiativesCreate,
            name: "Create Initiative",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageInitiativesRead,
            name: "Read Initiatives",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageInitiativesUpdateDetails,
            name: "Update Initiative Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageInitiativesDelete,
            name: "Delete Initiative",
            isLeaf: true,
          },
        ],
      },
    ],
  },
];
