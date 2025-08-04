import { DTO, CONSTANTS } from "sea-platform-helpers";

export interface TaskAssignedToYouMetadata {
  taskId: string;
}

export interface TaskUnassignedFromYouMetadata {
  taskId: string;
}

export interface NewCommentAddedMetadata {
  commentId: string;
  objectId: string;
  model: DTO.Comment.CommentSupportedModels;
  addedById: string;
}

export interface NewEventShownToEndUserMetadata {
  eventId: string;
}

/**
 * Map each Notification type to its metadata type
 */
export type NotificationMetadataMap = {
  [CONSTANTS.Notification.NotificationTypes
    .TaskAssignedToYou]: TaskAssignedToYouMetadata;
  [CONSTANTS.Notification.NotificationTypes
    .TaskUnassignedFromYou]: TaskUnassignedFromYouMetadata;
  [CONSTANTS.Notification.NotificationTypes
    .NewCommentAdded]: NewCommentAddedMetadata;
  [CONSTANTS.Notification.NotificationTypes
    .NewEventShownToEndUser]: NewEventShownToEndUserMetadata;
};

/**
 * Generic Metadata type resolver
 */
export type NotificationMetadata<
  T extends CONSTANTS.Notification.NotificationTypes
> = NotificationMetadataMap[T];
