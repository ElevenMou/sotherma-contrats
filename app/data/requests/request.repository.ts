import HttpService from "@/lib/http/http.service";
import type { IRequestRepository } from "./request.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { RequestListItemModel } from "./model/response/RequestModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { RequestsAPI } = getEnvironment();
const { base, endpoints } = RequestsAPI;

class RequestHttpRepository implements IRequestRepository {
  async GetListByUser(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">> {
    const url = generateUrl(`${base}${endpoints.listByUser}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      return httpService.get<ListResponseModel<RequestListItemModel, "requestList">>(
        url
      );
    } catch (error) {
      throw error;
    }
  }

  async GetListToValidateByUser(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<RequestListItemModel, "requestList">> {
    const url = generateUrl(`${base}${endpoints.listToValidate}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      return httpService.get<ListResponseModel<RequestListItemModel, "requestList">>(
        url
      );
    } catch (error) {
      throw error;
    }
  }
}

export const requestHttpRepository = new RequestHttpRepository();
