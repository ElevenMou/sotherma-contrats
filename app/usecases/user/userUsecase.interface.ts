import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import type React from "react";
import type { DelegationUserModel } from "@/data/users/model/response/DelegationUserModel";
import type { SetIsDelegetedRequestModel } from "@/data/users/model/request/SetIsDelegetedRequestModel";
import type { SetActiveStatusRequestModel } from "@/data/users/model/request/SetActiveStatusRequestModel";
import type { ChangePasswordRequestModel } from "@/data/users/model/request/ChangePasswordRequestModel";

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

export interface SetIsDelegetedView {
  setLoading: (loading: boolean) => void;
}
export interface UserAdminUseCaseInterface {
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

  setActiveStatus: ({
    request,
    view,
  }: {
    request: SetActiveStatusRequestModel;
    view: SetIsDelegetedView;
  }) => Promise<void>;
}

export interface ChangePasswordView {
  onSuccess: () => void;
}

export interface UserPublicUseCaseInterface {
  setIsDelegated: ({
    request,
    view,
  }: {
    request: SetIsDelegetedRequestModel;
    view: SetIsDelegetedView;
  }) => Promise<void>;

  changePassword: ({
    request,
    view,
  }: {
    request: ChangePasswordRequestModel;
    view: ChangePasswordView;
  }) => Promise<void>;
}
