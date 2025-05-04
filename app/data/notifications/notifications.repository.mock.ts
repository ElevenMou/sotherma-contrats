import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { NotificationListItemModel } from "./model/response/NotificationListItemModel";
import { notifications } from "./notifications";

const { NotificationsAPI } = getEnvironment();
const { base, endpoints } = NotificationsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const NotificationRepositoryMock = [
  http.get(`${baseUrl}${endpoints.notificationsList}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const notificationSlice = notifications.slice(
      startIndex,
      startIndex + maxRecords
    );

    const responseDto: ListResponseModel<
      NotificationListItemModel,
      "userNotifications"
    > = {
      totalCount: notifications.length,
      userNotifications: notificationSlice,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.numberOfNotifications}`, () => {
    const unreadCount = notifications.filter(
      (notification) => !notification.readed
    ).length;
    return HttpResponse.json(unreadCount, {
      status: 200,
    });
  }),
];
