import type { GetUserDetailsRequestModel } from "./model/request/GetUserDetailsRequestModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { UserDetailsModel } from "./model/response/UserDetailsModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { DelegationUserModel } from "./model/response/DelegationUserModel";
import type { SetIsDelegetedRequestModel } from "./model/request/SetIsDelegetedRequestModel";
import type { SetActiveStatusRequestModel } from "./model/request/SetActiveStatusRequestModel";
import type { ChangePasswordRequestModel } from "./model/request/ChangePasswordRequestModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;

  GetUsersList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<UserDetailsModel, "usersList">>;

  GetUserDetails(
    request: GetUserDetailsRequestModel
  ): Promise<UserDetailsModel>;

  SaveUserDetails(request: UserDetailsModel): Promise<string>;

  GetDelegationUsers(): Promise<DelegationUserModel[]>;

  SetIsDelegated(request: SetIsDelegetedRequestModel): Promise<void>;

  SetActiveStatus(request: SetActiveStatusRequestModel): Promise<void>;

  ChangePassword(request: ChangePasswordRequestModel): Promise<void>;
}
