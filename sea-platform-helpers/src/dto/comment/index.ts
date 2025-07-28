import { IAccount } from "../account";
import { IArrayDataResponse } from "../global";

export enum CommentSupportedModels {
  Task = "Task",
  Project = "Project",
  Initiative = "Initiative",
}

export interface IComment {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  edited: boolean;
  account?: IAccount;
}

export interface ICommentArrayDataResponse
  extends IArrayDataResponse<IComment> {
  data: IComment[];
}
