import { Organization } from "..";

export interface IGoal {
  id?: string;
  title: string;
  description: string;
  organizationId?: string;
  organization?: Organization.IOrganization
  startYear: number;
  endYear: number;
}