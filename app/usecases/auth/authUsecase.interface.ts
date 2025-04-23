import type { AuthenticateRequestModel } from "@/data/auth/model/request/AuthenticateRequestModel";
import type { UserInfoModel } from "@/data/auth/model/response/UserInfoResponseModel";

export interface AuthUseCaseInterface {
  authenticate: ({
    request,
  }: {
    request: AuthenticateRequestModel;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
