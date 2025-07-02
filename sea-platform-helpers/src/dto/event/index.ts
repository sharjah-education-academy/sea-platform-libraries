import { CONSTANTS } from "../..";
import { IEventCategory } from "../event-category";
import { IFile } from "../file";
import { IArrayDataResponse } from "../global";

export interface IEventLocation {
  displayName: string;
  locationType: string;
}
export interface IEventAttendee {
  name: string;
  email: string;
  responseStatus: string;
  type: string;
  responseAt: string;
}
export interface IEventOrganizer {
  name: string;
  email: string;
}
export interface IEvent {
  id: string;
  azureEventId: string;
  subject: string;
  body?: string;
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
  shownStatus?: CONSTANTS.Event.ShownStatuses;
  color: string;
  description?: string;
  attachmentFiles: IFile[];
}

export interface IEventArrayDataResponse extends IArrayDataResponse<IEvent> {
  data: IEvent[];
}
