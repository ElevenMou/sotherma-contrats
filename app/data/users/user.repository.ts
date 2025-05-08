import HttpService from "@/lib/http/http.service";
import type { IUserRepository } from "./user.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { CurrentUserInfoModel } from "./model/response/CurrentUserInfoResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { GetUserDetailsRequestModel } from "./model/request/GetUserDetailsRequestModel";
import type { UserDetailsModel } from "./model/response/UserDetailsModel";
import type { DelegationUserModel } from "./model/response/DelegationUserModel";
import type { SetIsDelegetedRequestModel } from "./model/request/SetIsDelegetedRequestModel";
import type { SetActiveStatusRequestModel } from "./model/request/SetActiveStatusRequestModel";

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
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<UserDetailsModel, "usersList">> {
    const url = generateUrl(`${base}${endpoints.usersList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      return httpService.get<ListResponseModel<UserDetailsModel, "usersList">>(
        url
      );
    } catch (error) {
      throw error;
    }
  }

  GetUserDetails(
    request: GetUserDetailsRequestModel
  ): Promise<UserDetailsModel> {
    const url = generateUrl(`${base}${endpoints.userDetails}`, {
      guid: request.guid,
    });

    try {
      return httpService.get<UserDetailsModel>(url);
    } catch (error) {
      throw error;
    }
  }

  SaveUserDetails(request: UserDetailsModel): Promise<string> {
    const url = `${base}${endpoints.save}`;
    try {
      return httpService.post<string>(url, request);
    } catch (error) {
      throw error;
    }
  }

  GetDelegationUsers(): Promise<DelegationUserModel[]> {
    const url = `${base}${endpoints.delegationUsers}`;
    try {
      return httpService.get<DelegationUserModel[]>(url);
    } catch (error) {
      throw error;
    }
  }

  SetIsDelegated(request: SetIsDelegetedRequestModel): Promise<void> {
    const url = `${base}${endpoints.setDelegated}`;
    try {
      return httpService.post<void>(url, request);
    } catch (error) {
      throw error;
    }
  }

  SetActiveStatus(request: SetActiveStatusRequestModel): Promise<void> {
    const url = `${base}${endpoints.setActiveStatus}`;
    try {
      return httpService.post<void>(url, request);
    } catch (error) {
      throw error;
    }
  }
}

export const userHttpRepository = new UserHttpRepository();
