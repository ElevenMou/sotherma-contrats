import type { ChangeRequestStatusModel } from "@/data/requests/model/request/ChangeRequestStatusModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface GetRequestsListView {
  setLoading: (loading: boolean) => void;
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
}
