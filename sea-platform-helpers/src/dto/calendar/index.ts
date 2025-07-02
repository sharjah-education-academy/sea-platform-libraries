import { IArrayDataResponse } from "../global";

export interface ICalendar {
  id: string;
  name: string;
  calendarEmail: string;
  color: string;
  enabled: boolean;
  lastSyncAt: string | null;
}

export interface ICalendarArrayDataResponse
  extends IArrayDataResponse<ICalendar> {
  data: ICalendar[];
}
