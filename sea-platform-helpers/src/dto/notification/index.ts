import { NotificationTypes } from "../../constants/notification";
import { IArrayDataResponse } from "../global";

export interface INotification {
  id: string;
  accountId: string;
  type: NotificationTypes;
  readAt?: Date;
  // TODO: type-safe for the objects
  objects: any;
  createdAt: string;
}

export interface INotificationArrayDataResponse
  extends IArrayDataResponse<INotification> {
  data: INotification[];

  unreadCount: number;
}
