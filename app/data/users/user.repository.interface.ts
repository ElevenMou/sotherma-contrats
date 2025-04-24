import type { GetUsersListRequestModel } from "./model/request/GetUsersListRequestModel";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { GetUsersListResponseModel } from "./model/response/GetUsersListResponseModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;
  GetUsersList(
    request: GetUsersListRequestModel
  ): Promise<GetUsersListResponseModel>;
}
