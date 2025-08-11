import { IArrayDataResponse } from "../global";

export interface IEmailTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  languages: {
    name: string;
    code: string;
  }[];
  parameters: string[];
}

export interface IEmailTemplateArrayDataResponse
  extends IArrayDataResponse<IEmailTemplate> {
  data: IEmailTemplate[];
}

export interface IEmailTemplateVersion {
  id: string;
  languageName: string;
  languageCode: string;
  subject: string;
  html: string;
  design: {};
}
