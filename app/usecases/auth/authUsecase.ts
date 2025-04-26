import type { AuthenticateRequestModel } from "@/data/auth/model/request/AuthenticateRequestModel";
import type { AuthUseCaseInterface } from "./authUsecase.interface";
import { authHttpRepository } from "@/data/auth/auth.repository";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/lib/http/http.service";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";

export const useAuthUsecase = (): AuthUseCaseInterface => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const authenticate = async ({
    request,
  }: {
    request: AuthenticateRequestModel;
  }) => {
    try {
      const callbackUrl = searchParams.get("callbackUrl") || routes.requests;
      const res = await authHttpRepository.Authenticate({
        email: request.email,
        password: request.password,
      });
      if (res.access_token && res.refresh_token) {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, res.access_token);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, res.refresh_token);
      } else {
        toast.error(t("login.errors.loginFailed"), {
          description: t("login.errors.invalidCredentials"),
        });
      }
      navigate(callbackUrl, { replace: true });
    } catch (error) {
      toast.error(t("login.errors.loginFailed"), {
        description: t("login.errors.errorOccured"),
      });
    }
  };

  return { authenticate, logout };
};

export const logout = async () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  window.location.replace(routes.login);
};
