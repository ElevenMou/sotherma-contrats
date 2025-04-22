import type { AuthenticateRequestModel } from "./model/request/AuthenticateRequestModel";
import type { AuthenticateResponseModel } from "./model/response/AuthenticateResponseModel";

export interface IAuthRepository {
  Authenticate(
    body: AuthenticateRequestModel
  ): Promise<AuthenticateResponseModel>;
}
