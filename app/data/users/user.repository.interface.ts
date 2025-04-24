import type { GetUserDetailsRequestModel } from "./model/request/GetUserDetailsRequestModel";
import type { GetUsersListRequestModel } from "./model/request/GetUsersListRequestModel";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { GetUserDetailsResponseModel } from "./model/response/GetUserDetailsResponseModel";
import type { GetUsersListResponseModel } from "./model/response/GetUsersListResponseModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;
  GetUsersList(
    request: GetUsersListRequestModel
  ): Promise<GetUsersListResponseModel>;
  GetUserDetails(
    request: GetUserDetailsRequestModel
  ): Promise<GetUserDetailsResponseModel>;
}
