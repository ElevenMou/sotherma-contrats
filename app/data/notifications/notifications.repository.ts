import HttpService from "@/lib/http/http.service";
import { generateUrl, getEnvironment } from "../environment";
import type { INotificationRepository } from "./notifications.repository.interface";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { NotificationListItemModel } from "./model/response/NotificationListItemModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { NotificationsAPI } = getEnvironment();
const { base, endpoints } = NotificationsAPI;

class NotificationHttpRepository implements INotificationRepository {
  async GetNotifications(request: ListPaginationRequestModel) {
    const url = generateUrl(`${base}${endpoints.notificationsList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });
    const response = await httpService.get<
      ListResponseModel<NotificationListItemModel, "userNotifications">
    >(url);
    return response;
  }

  async GetNumberOfUnreadNotifications() {
    const url = `${base}${endpoints.numberOfNotifications}`;
    const response = await httpService.get<number>(url);
    return response;
  }
}

export const notificationHttpRepository = new NotificationHttpRepository();
