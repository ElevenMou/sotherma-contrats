import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import type React from "react";
import type { DelegationUserModel } from "@/data/users/model/response/DelegationUserModel";

export interface GetUserDetailsView {
  setLoading: (loading: boolean) => void;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsModel | null>>;
  onError: () => void;
}

export interface SaveUserDetailsView {
  onSuccess: () => void;
}

export interface GetDelegationUsersView {
  setLoading: (loading: boolean) => void;
  setDelegationUsers: React.Dispatch<
    React.SetStateAction<DelegationUserModel[]>
  >;
}
export interface UserUseCaseInterface {
  getUsersList: ({
    request,
  }: {
    request: ListPaginationRequestModel;
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
    view,
  }: {
    request: UserDetailsModel;
    view: SaveUserDetailsView;
  }) => Promise<void>;

  getDelegationUsers: ({
    view,
  }: {
    view: GetDelegationUsersView;
  }) => Promise<void>;
}
