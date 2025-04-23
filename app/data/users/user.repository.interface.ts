import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";

export interface IUserRepository {
  GetCurrentUserInfo(): Promise<CurrentUserInfoModel>;
}
