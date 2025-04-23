import HttpService from "@/lib/http/http.service";
import type { IUserRepository } from "./user.repository.interface";
import { getEnvironment } from "../environment";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { UserAPI } = getEnvironment();
const { base, endpoints } = UserAPI;

class UserHttpRepository implements IUserRepository {
  async GetCurrentUserInfo(): Promise<CurrentUserInfoModel> {
    const url = `${base}${endpoints.userInfo}`;
    try {
      const response = await httpService.get<CurrentUserInfoModel>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userHttpRepository = new UserHttpRepository();
