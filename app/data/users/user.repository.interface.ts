import type { GetUserDetailsRequestModel } from "./model/request/GetUserDetailsRequestModel";
import type { GetUsersListRequestModel } from "./model/request/GetUsersListRequestModel";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { UserDetailsModel } from "./model/response/UserDetailsModel";
import type { GetUsersListResponseModel } from "./model/response/GetUsersListResponseModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;
  GetUsersList(
    request: GetUsersListRequestModel
  ): Promise<GetUsersListResponseModel>;
  GetUserDetails(
    request: GetUserDetailsRequestModel
  ): Promise<UserDetailsModel>;
  SaveUserDetails(request: UserDetailsModel): Promise<string>;
}
