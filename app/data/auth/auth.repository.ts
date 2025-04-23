import HttpService from "@/lib/http/http.service";
import type { IAuthRepository } from "./auth.repository.interface";
import type { AuthenticateRequestModel } from "./model/request/AuthenticateRequestModel";
import type { AuthenticateResponseModel } from "./model/response/AuthenticateResponseModel";
import { getEnvironment } from "../environment";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { AuthAPI } = getEnvironment();
const { base, endpoints } = AuthAPI;

class AuthHttpRepository implements IAuthRepository {
  async Authenticate(
    body: AuthenticateRequestModel
  ): Promise<AuthenticateResponseModel> {
    const url = `${base}${endpoints.authenticate}`;
    try {
      const response = await httpService.post<AuthenticateResponseModel>(
        url,
        body
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const authHttpRepository = new AuthHttpRepository();
