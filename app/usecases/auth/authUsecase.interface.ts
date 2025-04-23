import type { AuthenticateRequestModel } from "@/data/auth/model/request/AuthenticateRequestModel";
import type { CurrentUserInfoModel } from "@/data/users/model/response/CurrentUserInfoResponseModel";

export interface AuthUseCaseInterface {
  authenticate: ({
    request,
  }: {
    request: AuthenticateRequestModel;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
