import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { GetProfileFileRequestModel } from "./model/request/GetProfileFileRequestModel";
import type { NotifyProviderRequestModel } from "./model/request/NotifyProviderRequestModel";
import type { RequestDetailsModel } from "./model/request/RequestDetailsModel";
import type { GetProfileFileResponseModel } from "./model/response/GetProfileFileResponseModel";
import type { RequestListItemModel } from "./model/response/RequestModel";
import type { RequestTimeLineModel } from "./model/response/RequestTimeLineModel";

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

  GetRequestDetails(requestGuid: string): Promise<RequestDetailsModel>;

  GetRequestTimeline(requestGuid: string): Promise<RequestTimeLineModel[]>;

  GetProfileFile(
    request: GetProfileFileRequestModel
  ): Promise<GetProfileFileResponseModel>;

  NotifyProvider(request: NotifyProviderRequestModel): Promise<void>;
}
