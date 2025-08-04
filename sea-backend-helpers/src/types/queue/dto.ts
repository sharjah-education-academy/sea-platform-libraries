import { CONSTANTS } from "sea-platform-helpers";
import { NotificationMetadata } from "../notification";

interface IBaseNotification {
  applicationKey: CONSTANTS.Application.ApplicationKeys;
}

export interface ITaskAssignedToYou<
  T extends CONSTANTS.Notification.NotificationTypes = CONSTANTS.Notification.NotificationTypes
> extends IBaseNotification {
  accountId: string;
  metadata: NotificationMetadata<T>;
}

export interface ITaskUnAssignedFromYou<
  T extends CONSTANTS.Notification.NotificationTypes = CONSTANTS.Notification.NotificationTypes
> extends IBaseNotification {
  accountId: string;
  metadata: NotificationMetadata<T>;
}

export interface INewCommentAdded<
  T extends CONSTANTS.Notification.NotificationTypes = CONSTANTS.Notification.NotificationTypes
> extends IBaseNotification {
  accountId: string;
  metadata: NotificationMetadata<T>;
}
