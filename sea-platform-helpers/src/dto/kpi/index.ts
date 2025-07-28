import { IFile } from "../file";
import { IArrayDataResponse } from "../global";

export enum KPITrackingMethods {
  Manual = "Manual",
  Project = "Project",
  Task = "Task",
}
export enum KPIReportingFrequencies {
  Yearly = "Yearly",
  Quarterly = "Quarterly",
}
export enum KPIReportingTypes {
  Boolean = "Boolean",
  Number = "Number",
}

export interface IKPIPeriodEvidence {
  id: string;
  title: string;
  description: string | undefined;
  URL: string | undefined;
  file: IFile | undefined;
}

export interface IKPIPeriod {
  id: string;
  period: string;
  year: number;
  target: number | boolean;
  progress: number | boolean;
  evidence: IKPIPeriodEvidence | undefined;
  difference: number | boolean;
}

export interface IKPI {
  id: string;
  title: string;
  description: string;
  trackingMethod: KPITrackingMethods;
  reportingFrequency: KPIReportingFrequencies;
  reportingType: KPIReportingTypes;
  reportingUnit: string;
  target: number | boolean;
  periods?: IKPIPeriod[];
}

export interface IKPIArrayDataResponse extends IArrayDataResponse<IKPI> {
  data: IKPI[];
}
