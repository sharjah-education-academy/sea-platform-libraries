import { IAccount } from "../account";
import { IArrayDataResponse } from "../global";

export enum TaskPriorities {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface ITask {
  id: string;
  projectId: string;
  milestoneId: string;
  sectionId: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriorities;
  completionPercentage: number;
  remainingDays?: number;
  isCompleted?: boolean;
  completedAt?: string;
  assignedAccount?: IAccount;
  dependOnTask?: ITask;
}

export interface ITaskArrayDataResponse extends IArrayDataResponse<ITask> {
  data: ITask[];
}
