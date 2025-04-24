import HttpService from "@/lib/http/http.service";
import type { IUserRepository } from "./user.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { GetUsersListRequestModel } from "./model/request/GetUsersListRequestModel";
import type { GetUsersListResponseModel } from "./model/response/GetUsersListResponseModel";

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

  GetUsersList(
    request: GetUsersListRequestModel
  ): Promise<GetUsersListResponseModel> {
    const url = generateUrl(`${base}${endpoints.usersList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      return httpService.get<GetUsersListResponseModel>(url);
    } catch (error) {
      throw error;
    }
  }
}

export const userHttpRepository = new UserHttpRepository();
