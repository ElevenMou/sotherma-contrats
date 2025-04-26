import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { RequestListItemModel } from "./model/response/RequestModel";

export interface IRequestRepository {
  GetListByUser(
    request: ListPaginationRequestModel,
    userId: string
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">>;

  GetListToValidateByUser(
    request: ListPaginationRequestModel,
    userId: string
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">>;
}
