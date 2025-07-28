import { IAccount } from "../account";
import { IArrayDataResponse } from "../global";
import { IKPI } from "../kpi";

export enum ProjectMemberTypes {
  Stakeholder = "Stakeholder",
  Member = "Member",
}

export interface IProjectMember {
  account?: IAccount;
  type: ProjectMemberTypes;
}

export interface IProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  order: number;
  dueDate: string;
  completionPercentage: number;
}

export interface IProjectSection {
  id: string;
  projectId: string;
  name: string;
  order: number;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  owner?: IAccount;
  members?: IProjectMember[];
  milestones?: IProjectMilestone[];
  sections?: IProjectSection[];
  kpis?: IKPI[];
  budget: number;
  budgetUnit: string;
  startDate: string;
  endDate: string;
  totalTasksCount: number;
  completedTasksCount: number;
  completionPercentage: number;
}

export interface IProjectArrayDataResponse
  extends IArrayDataResponse<IProject> {
  data: IProject[];
}
