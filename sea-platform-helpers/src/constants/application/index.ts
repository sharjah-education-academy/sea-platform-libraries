export enum ApplicationStatuses {
  Unavailable = "Unavailable",
  UnderRepair = "Under-Repair",
  Available = "Available",
}

export enum ApplicationKeys {
  PlatformAdministrationApplication = "Platform-Administration-Application",
  StrategyApplication = "Strategy-Application",
}

export const Applications = [
  {
    name: "Platform Administration Application",
    key: ApplicationKeys.PlatformAdministrationApplication,
    status: ApplicationStatuses.Available,
    description:
      "The main application for managing the platform, including user accounts, roles, and permissions.",
  },
  {
    name: "Strategy Application",
    key: ApplicationKeys.StrategyApplication,
    status: ApplicationStatuses.Unavailable,
    description:
      "An application for managing and executing strategies within the platform.",
  },
];
