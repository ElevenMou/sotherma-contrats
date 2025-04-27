import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { RequestDetailsModel } from "./model/request/RequestDetailsModel";
import type { RequestListItemModel } from "./model/response/RequestModel";

export interface IRequestRepository {
  GetListByUser(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">>;

  GetListToValidateByUser(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">>;

  AcceptRequest(requestGuid: string): Promise<void>;

  RejectRequest(requestGuid: string, reason: string): Promise<void>;

  SaveRequest(request: RequestDetailsModel): Promise<void>;
}
