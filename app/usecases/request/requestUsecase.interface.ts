import type { ChangeRequestStatusModel } from "@/data/requests/model/request/ChangeRequestStatusModel";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface GetRequestsListView {
  setLoading: (loading: boolean) => void;
}

export interface SaveRequestView {
  navigateToRequestsList: () => void;
}

export interface GetRequestDetailsView {
  setLoading: (loading: boolean) => void;
  setRequestDetails: (requestDetails: RequestDetailsModel) => void;
}

export interface RequestUseCaseInterface {
  getRequestsList: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetRequestsListView;
  }) => Promise<void>;
  getRequestsListToValidate: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetRequestsListView;
  }) => Promise<void>;

  acceptRequest: ({
    request,
  }: {
    request: ChangeRequestStatusModel;
  }) => Promise<void>;

  rejectRequest: ({
    request,
  }: {
    request: ChangeRequestStatusModel;
  }) => Promise<void>;

  saveRequest: ({
    request,
    view,
  }: {
    request: RequestDetailsModel;
    view: SaveRequestView;
  }) => Promise<void>;

  getRequestDetails: ({
    requestGuid,
    view,
  }: {
    requestGuid: string;
    view: GetRequestDetailsView;
  }) => Promise<void>;
}
