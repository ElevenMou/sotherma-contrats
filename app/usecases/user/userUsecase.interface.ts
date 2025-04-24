import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { GetUsersListRequestModel } from "@/data/users/model/request/GetUsersListRequestModel";
import type { GetUserDetailsResponseModel } from "@/data/users/model/response/GetUserDetailsResponseModel";
import type React from "react";

export interface GetUsersListView {
  setLoading: (loading: boolean) => void;
}

export interface GetUserDetailsView {
  setLoading: (loading: boolean) => void;
  setUserDetails: React.Dispatch<
    React.SetStateAction<GetUserDetailsResponseModel | null>
  >;
  onError: () => void;
}

export interface UserUseCaseInterface {
  getUsersList: ({
    request,
    view,
  }: {
    request: GetUsersListRequestModel;
    view: GetUsersListView;
  }) => Promise<void>;

  getUserDetails: ({
    request,
    view,
  }: {
    request: GetUserDetailsRequestModel;
    view: GetUserDetailsView;
  }) => Promise<void>;
}
