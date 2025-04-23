import type { AuthenticateRequestModel } from "./model/request/AuthenticateRequestModel";
import type { AuthenticateResponseModel } from "./model/response/AuthenticateResponseModel";
import type { UserInfoModel } from "./model/response/UserInfoResponseModel";

export interface IAuthRepository {
  Authenticate(
    body: AuthenticateRequestModel
  ): Promise<AuthenticateResponseModel>;

  GetUserInfo(): Promise<UserInfoModel>;
}
