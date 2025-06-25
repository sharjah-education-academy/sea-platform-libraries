import { IPermission } from "../../dto/permission";
import { ApplicationKeys } from "../application";

export type ValidationStrategy = "all" | "some" | "one";

export enum PermissionKeys {
  // Administration Application
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

  // Strategy Application
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
  ManageKPIs = "manage-kpis",
  ManageKPIsCreate = "manage-kpis-create",
  ManageKPIsRead = "manage-kpis-read",
  ManageKPIsUpdateDetails = "manage-kpis-update-details",
  ManageKPIsDelete = "manage-kpis-delete",
  ManageKPIsAddUpdateEvidence = "manage-kpis-add-update-evidence",
  ManageKPIsAddUpdateProgress = "manage-kpis-add-update-progress",
  ManageProjects = "manage-projects",
  ManageProjectsCreate = "manage-projects-create",
  ManageProjectsRead = "manage-projects-read",
  ManageProjectsUpdateDetails = "manage-projects-update-details",
  ManageProjectsDelete = "manage-projects-delete",
  ManageProjectMembers = "manage-project-members",
  ManageProjectMilestones = "manage-project-milestones",
  ManageProjectSections = "manage-project-sections",

  // Public Calendar
  PublicCalendarApp = "public-calendar-app",
  PublicCalendarManagement = "public-calendar-management",
  ManageCalendar = "manage-calendar",
  ManageCalendarCreate = "manage-calendar-create",
  ManageCalendarRead = "manage-calendar-read",
  ManageCalendarUpdateDetails = "manage-calendar-update-details",
  ManageCalendarDelete = "manage-calendar-delete",
  ManageEvent = "manage-event",
  ViewPublicCalendar = "view-public-calendar",
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

      {
        applicationKey: ApplicationKeys.StrategyApplication,
        key: PermissionKeys.ManageKPIs,
        name: "Manage KPIs",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsCreate,
            name: "Create KPI",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsRead,
            name: "Read KPIs",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsUpdateDetails,
            name: "Update KPI Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsDelete,
            name: "Delete KPI",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsAddUpdateEvidence,
            name: "Add/Update KPI Evidence",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageKPIsAddUpdateProgress,
            name: "Add/Update KPI Progress",
            isLeaf: true,
          },
        ],
      },

      {
        applicationKey: ApplicationKeys.StrategyApplication,
        key: PermissionKeys.ManageProjects,
        name: "Manage Projects",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectsCreate,
            name: "Create Project",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectsRead,
            name: "Read Projects",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectsUpdateDetails,
            name: "Update Project Details",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectsDelete,
            name: "Delete Project",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectMembers,
            name: "Manage Project Members",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectMilestones,
            name: "Manage Project Milestones",
            isLeaf: true,
          },
          {
            applicationKey: ApplicationKeys.StrategyApplication,
            key: PermissionKeys.ManageProjectSections,
            name: "Manage Project Sections",
            isLeaf: true,
          },
        ],
      },
    ],
  },

  {
    applicationKey: ApplicationKeys.PublicCalendarApplication,
    key: PermissionKeys.PublicCalendarApp,
    name: "Public Calendar",
    isLeaf: false,
    children: [
      {
        applicationKey: ApplicationKeys.PublicCalendarApplication,
        key: PermissionKeys.PublicCalendarManagement,
        name: "Management",
        isLeaf: false,
        children: [
          {
            applicationKey: ApplicationKeys.PublicCalendarApplication,
            isLeaf: false,
            key: PermissionKeys.ManageCalendar,
            name: "Manage Calendar",
            children: [
              {
                applicationKey: ApplicationKeys.PublicCalendarApplication,
                isLeaf: true,
                key: PermissionKeys.ManageCalendarCreate,
                name: "Create Calendar",
              },
              {
                applicationKey: ApplicationKeys.PublicCalendarApplication,
                isLeaf: true,
                key: PermissionKeys.ManageCalendarRead,
                name: "Read Calendars",
              },
              {
                applicationKey: ApplicationKeys.PublicCalendarApplication,
                isLeaf: true,
                key: PermissionKeys.ManageCalendarUpdateDetails,
                name: "Update Calendar",
              },
              {
                applicationKey: ApplicationKeys.PublicCalendarApplication,
                isLeaf: true,
                key: PermissionKeys.ManageCalendarDelete,
                name: "Delete Calendar",
              },
            ],
          },
          {
            applicationKey: ApplicationKeys.PublicCalendarApplication,
            isLeaf: true,
            key: PermissionKeys.ManageEvent,
            name: "Manage Event",
          },
        ],
      },
      {
        applicationKey: ApplicationKeys.PublicCalendarApplication,
        key: PermissionKeys.ViewPublicCalendar,
        name: "View Public Calendar",
        isLeaf: true,
      },
    ],
  },
];
