import type { AuthenticateRequestModel } from "@/data/auth/model/request/AuthenticateRequestModel";

export interface AuthUseCaseInterface {
  authenticate: ({
    request,
  }: {
    request: AuthenticateRequestModel;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
