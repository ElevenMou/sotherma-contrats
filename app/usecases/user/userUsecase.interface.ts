import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import type React from "react";

export interface GetUsersListView {
  setLoading: (loading: boolean) => void;
}

export interface GetUserDetailsView {
  setLoading: (loading: boolean) => void;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsModel | null>>;
  onError: () => void;
}

export interface UserUseCaseInterface {
  getUsersList: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetUsersListView;
  }) => Promise<void>;

  getUserDetails: ({
    request,
    view,
  }: {
    request: GetUserDetailsRequestModel;
    view: GetUserDetailsView;
  }) => Promise<void>;

  saveUserDetails: ({
    request,
  }: {
    request: UserDetailsModel;
  }) => Promise<void>;
}
