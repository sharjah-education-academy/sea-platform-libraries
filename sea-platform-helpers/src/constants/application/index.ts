export enum ApplicationStatuses {
  Unavailable = "Unavailable",
  UnderRepair = "Under-Repair",
  Available = "Available",
}

export enum ApplicationKeys {
  PlatformAdministrationApplication = "Platform-Administration-Application",
  PublicCalendarApplication = "Public-Calendar-Application",
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
    name: "Public Calendar Application",
    key: ApplicationKeys.PublicCalendarApplication,
    status: ApplicationStatuses.Unavailable,
    description:
      "An application for managing the public calendar within the platform.",
  },
  {
    name: "Strategy Application",
    key: ApplicationKeys.StrategyApplication,
    status: ApplicationStatuses.Unavailable,
    description:
      "An application for managing and executing strategies within the platform.",
  },
];
