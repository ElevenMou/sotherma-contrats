import type { GetUserDetailsRequestModel } from "./model/request/GetUserDetailsRequestModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { UserDetailsModel } from "./model/response/UserDetailsModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;
  GetUsersList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<UserDetailsModel, "usersList">>;
  GetUserDetails(
    request: GetUserDetailsRequestModel
  ): Promise<UserDetailsModel>;
  SaveUserDetails(request: UserDetailsModel): Promise<string>;
}
