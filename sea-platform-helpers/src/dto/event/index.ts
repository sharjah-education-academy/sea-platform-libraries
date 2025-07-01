import { IEventCategory } from "../event-category";
import { IFile } from "../file";
import { IArrayDataResponse } from "../global";

export enum ShownStatuses {
  All = "All",
  Pending = "Pending",
  Shown = "Shown",
  Hidden = "Hidden",
}

export interface IEventBody {
  contentType: string;
  content: string;
  bodyPreview: string;
}

export interface IEventLocation {
  displayName: string;
  locationType: string;
}
export interface IEventAttendee {
  name: string;
  email: string;
  responseStatus: string;
  responseAt: string;
}
export interface IEventOrganizer {
  name: string;
  email: string;
}
export interface IEvent {
  azureEventId: string;
  subject: string;
  body: IEventBody;
  location: IEventLocation;
  start: string;
  end: string;
  webLink: string;
  joinLink: string;
  importance: string;
  isCancelled: boolean;
  isOnlineMeeting: boolean;
  isAllDay: boolean;
  attendees: IEventAttendee[];
  organizer: IEventOrganizer;
  category?: IEventCategory;
  isShown?: boolean;
  color: string;
  description?: string;
  attachmentFiles: IFile[];
}

export interface IEventArrayDataResponse extends IArrayDataResponse<IEvent> {
  data: IEvent[];
}
