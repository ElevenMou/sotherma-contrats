import type { GetUsersListRequestModel } from "@/data/users/model/request/GetUsersListRequestModel";

export interface GetUsersListView {
  setLoading: (loading: boolean) => void;
}

export interface UserUseCaseInterface {
  getUsersList: ({
    request,
    view,
  }: {
    request: GetUsersListRequestModel;
    view: GetUsersListView;
  }) => Promise<void>;
}
