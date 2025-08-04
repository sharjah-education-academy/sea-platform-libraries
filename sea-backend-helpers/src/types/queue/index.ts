import { Messages } from "../../constants/queue";
import * as DTO from "./dto";

export type NotificationJobTypes = {
  TaskAssignedToYou: DTO.ITaskAssignedToYou;
  TaskUnAssignedFromYou: DTO.ITaskUnAssignedFromYou;
  NewCommentAdded: DTO.INewCommentAdded;
};

export type EmailJobTypes = {};

export type MessageJobMap = {
  [Messages.Notification]: NotificationJobTypes;
  [Messages.Email]: EmailJobTypes;
};

// 🔧 Converts union of objects to intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// 🔧 Flatten the job map into a union of one-key objects
type FlattenJobMap<T> = {
  [K in keyof T]: {
    [P in keyof T[K] as `${K & string}:${P & string}`]: T[K][P];
  };
}[keyof T];

// ✅ Final Jobs type: a flat object with all `${Queue}:${Job}` keys
export type Jobs = UnionToIntersection<FlattenJobMap<MessageJobMap>>;

// ✅ Accessors
export type JobName = keyof Jobs;
export type JobPayload<Name extends JobName> = Jobs[Name];
