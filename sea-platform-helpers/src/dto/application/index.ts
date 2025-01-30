import { ApplicationStatuses } from "../../constants/application";
import { IFile } from "../file";
import { IArrayDataResponse } from "../global";

export interface IApplication {
  id: string;
  name: string;
  description: string | undefined;
  status: ApplicationStatuses;
  iconFile: IFile | undefined;
  URL: string;
}

export interface IApplicationArrayDataResponse
  extends IArrayDataResponse<IApplication> {
  data: IApplication[];
}
