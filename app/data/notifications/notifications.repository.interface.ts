import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { NotificationListItemModel } from "./model/response/NotificationListItemModel";

export interface INotificationRepository {
  GetNotifications: (
    request: ListPaginationRequestModel
  ) => Promise<
    ListResponseModel<NotificationListItemModel, "userNotifications">
  >;
  GetNumberOfUnreadNotifications: () => Promise<number>;
}
