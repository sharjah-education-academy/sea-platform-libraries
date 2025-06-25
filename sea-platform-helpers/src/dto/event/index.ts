import { IEventCategory } from "../event-category";

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
}
