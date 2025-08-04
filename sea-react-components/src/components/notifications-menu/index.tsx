"use client";
import React, { useEffect, useState } from "react";
import { CONSTANTS, DTO, Utils } from "sea-platform-helpers";
import clsx from "clsx";
import Icon from "../icon";
import NativeMenu from "../native-menu";
import NativeMenuItem from "../native-menu/native-menu-item";
import { INotificationArrayDataResponse } from "sea-platform-helpers/dist/dto/notification";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import Loader from "../loader";
import Skeleton from "../skeleton";

const DEFAULT_FETCH_NOTIFICATIONS_LIMIT = 50;

const axiosOptions = {
  headers: {
    Authorization: `Bearer ${getCookie(CONSTANTS.JWT.JWTCookieKey)}`,
  },
};

export type Props = {
  applicationKey:
    | CONSTANTS.Application.ApplicationKeys
    | CONSTANTS.Global.AllType;
  // fetchNotifications: (
  //   applicationKey:
  //     | CONSTANTS.Application.ApplicationKeys
  //     | CONSTANTS.Global.AllType,
  //   page: number,
  //   limit: number
  // ) => Promise<INotificationArrayDataResponse>;
  limit?: number;
  notificationBaseUrl: string;
  applicationsBaseUrls: Partial<
    Record<CONSTANTS.Application.ApplicationKeys, string>
  >;
  navigate?: (to: string) => void;
};
export default function NotificationMenu({
  applicationKey,
  notificationBaseUrl,
  // fetchNotifications,
  limit = DEFAULT_FETCH_NOTIFICATIONS_LIMIT,
  applicationsBaseUrls,
  navigate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<
    DTO.Notification.INotification[]
  >([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<DTO.Notification.INotificationArrayDataResponse>(
        `${notificationBaseUrl}?applicationKey=${applicationKey}&page=${page}&limit=${limit}`,
        axiosOptions
      )
      .then((response) => {
        const {
          data,
          page: p,
          totalCount: tc,
          totalPages: tp,
          unreadCount,
        } = response.data;

        setTotalCount(tc);
        setTotalPages(tp);
        setUnreadCount(unreadCount);

        setNotifications((prev) => {
          const all = Utils.Array.concatWithoutDuplicates(
            prev,
            data,
            (a, b) => a.id === b.id
          );
          return all;
        });

        return response;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicationKey, notificationBaseUrl, limit, page]);

  const markAsRead = (notification: DTO.Notification.INotification) => {
    axios
      .put<DTO.Notification.INotification>(
        `${notificationBaseUrl}/${notification.id}/read`,
        {},
        axiosOptions
      )
      .then((response) => {
        const readed = response.data;
        setNotifications((prev) => {
          return prev.map((n) => {
            if (n.id === readed.id) n = readed;
            return n;
          });
        });

        if (!notification.readAt) setUnreadCount((prev) => prev - 1);
      });
  };

  const markAllAsRead = () => {
    axios
      .put<DTO.Notification.INotification>(
        `${notificationBaseUrl}/read-all`,
        {},
        axiosOptions
      )
      .then(() => {
        setNotifications((prev) => {
          return prev.map((n) => {
            n.readAt = new Date();
            return n;
          });
        });

        setUnreadCount(0);
      });
  };

  const LoadMoreNotifications = () => {
    setPage((prev) => {
      let newPage = prev + 1;
      if (newPage > totalPages) newPage = totalPages;
      return newPage;
    });
  };

  const renderNotificationItem = (
    notification: DTO.Notification.INotification
  ) => {
    let title = <></>,
      description = <></>,
      icon = <></>,
      link: string = undefined;

    switch (notification.type) {
      case CONSTANTS.Notification.NotificationTypes.TaskAssignedToYou: {
        const task = (notification.objects ?? {}).task;
        icon = (
          <Icon icon="fluent-mdl2:assign" className="h-10 w-10 transform" />
        );
        title = (
          <p className="font-semibold line-clamp-2">New task assigned to you</p>
        );
        description = (
          <p className="text-text text-sm line-clamp-2">
            <span className="font-bold">{task?.title}</span> assigned to you,
            check it!{" "}
          </p>
        );
        link = `${
          applicationsBaseUrls[
            CONSTANTS.Application.ApplicationKeys.StrategyApplication
          ]
        }/tasks/${task.id}`;
        break;
      }
      case CONSTANTS.Notification.NotificationTypes.TaskUnassignedFromYou: {
        const task = (notification.objects ?? {}).task;
        icon = (
          <Icon
            icon="fluent-mdl2:assign"
            className="h-10 w-10 transform scale-x-[-1]"
          />
        );
        title = (
          <p className="font-semibold line-clamp-2">Task unassigned from you</p>
        );
        description = (
          <p className="text-text text-sm line-clamp-2">
            Task <span className="font-bold">{task?.title}</span> unassigned
            from you, check it!{" "}
          </p>
        );

        link = `${
          applicationsBaseUrls[
            CONSTANTS.Application.ApplicationKeys.StrategyApplication
          ]
        }/tasks/${task.id}`;
        break;
      }
      case CONSTANTS.Notification.NotificationTypes.NewCommentAdded: {
        const addedBy: DTO.Account.IAccount = (notification.objects ?? {})
          .addedBy;
        const objectName = (notification.objects ?? {}).objectName;
        const model: DTO.Comment.CommentSupportedModels = (
          notification.objects ?? {}
        ).model;
        icon = (
          <Icon icon="weui:comment-outlined" className="h-10 w-10 transform" />
        );
        title = <p className="font-semibold line-clamp-2">New comment</p>;
        description = (
          <p className="text-text text-sm line-clamp-2">
            A new comment by <span className="font-bold">{addedBy?.name}</span>{" "}
            on <span className="font-bold">{objectName}</span> {model}
          </p>
        );

        switch (model) {
          case DTO.Comment.CommentSupportedModels.Project: {
            link = `${
              applicationsBaseUrls[
                CONSTANTS.Application.ApplicationKeys.StrategyApplication
              ]
            }/projects/${
              notification.objects.objectId
            }?comments=true&commentId=${notification.objects.commentId}`;
            break;
          }
          case DTO.Comment.CommentSupportedModels.Initiative: {
            link = `${
              applicationsBaseUrls[
                CONSTANTS.Application.ApplicationKeys.StrategyApplication
              ]
            }/initiatives/${
              notification.objects.objectId
            }?comments=true&commentId=${notification.objects.commentId}`;
            break;
          }
          case DTO.Comment.CommentSupportedModels.Task: {
            link = `${
              applicationsBaseUrls[
                CONSTANTS.Application.ApplicationKeys.StrategyApplication
              ]
            }/tasks/${notification.objects.objectId}?comments=true&commentId=${
              notification.objects.commentId
            }`;
            break;
          }
          default:
            break;
        }

        break;
      }

      default:
        break;
    }
    return (
      <div
        className={clsx("flex items-center gap-1 px-2 py-1 cursor-pointer", {
          "bg-primary bg-opacity-25": notification.readAt === undefined,
        })}
        onClick={() => {
          markAsRead(notification);
          if (link && navigate) navigate(link);
        }}
      >
        <div>{icon}</div>
        <div className="flex-1">
          <div>{title}</div>
          <div>{description}</div>
          <div className="flex justify-end">
            <p className="text-text text-xs">
              {Utils.Moment.formatDateAsLabel(notification.createdAt)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NativeMenu
      size="xl"
      menuButton={
        <div className="relative">
          <Icon
            icon="mingcute:notification-line"
            className="text-primary hover:text-opacity-50 w-6 h-6 custom-animation"
          />
          {unreadCount !== 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 text-center rounded-full text-white bg-error shadow-md flex items-center justify-center">
              <p className="text-xs select-none">{unreadCount}</p>
            </div>
          )}
        </div>
      }
      maxHeight={350}
      onReachBottom={() => LoadMoreNotifications()}
    >
      <div className="flex flex-col gap-5 p-2">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xl font-bold">Notifications</p>
          <button
            type="button"
            className="flex items-center gap-1 px-2 text-primary custom-animation hover:text-opacity-75"
            onClick={() => markAllAsRead()}
          >
            <p>Mare all as read</p>
            <Icon icon="solar:check-read-linear" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {notifications.map((notification) => (
            <NativeMenuItem key={`notification-${notification.id}`}>
              {renderNotificationItem(notification)}
            </NativeMenuItem>
          ))}

          {loading && (
            <>
              {Array(3)
                .fill({})
                .map((_, i) => (
                  <Skeleton
                    key={`notification-loading-${i}`}
                    className="h-24 w-full"
                  />
                ))}
            </>
          )}
        </div>

        {!loading && page === totalPages && (
          <p className="text-text text-center text-xs">
            There are no more notifications
          </p>
        )}
      </div>
    </NativeMenu>
  );
}
