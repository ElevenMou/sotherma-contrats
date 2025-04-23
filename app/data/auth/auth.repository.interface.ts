import type { AuthenticateRequestModel } from "./model/request/AuthenticateRequestModel";
import type { AuthenticateResponseModel } from "./model/response/AuthenticateResponseModel";
import type { CurrentUserInfoModel } from "../users/model/response/CurrentUserInfoResponseModel";

export interface IAuthRepository {
  Authenticate(
    body: AuthenticateRequestModel
  ): Promise<AuthenticateResponseModel>;

}
