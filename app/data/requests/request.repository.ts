import HttpService from "@/lib/http/http.service";
import type { IRequestRepository } from "./request.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { RequestListItemModel } from "./model/response/RequestModel";
import type { RequestDetailsModel } from "./model/request/RequestDetailsModel";

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
      return httpService.get<
        ListResponseModel<RequestListItemModel, "requestList">
      >(url);
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
      return httpService.get<
        ListResponseModel<RequestListItemModel, "requestList">
      >(url);
    } catch (error) {
      throw error;
    }
  }

  async AcceptRequest(requestGuid: string): Promise<void> {
    const url = `${base}${endpoints.acceptRequest}`;
    try {
      await httpService.post(url, { requestGuid });
    } catch (error) {
      throw error;
    }
  }

  async RejectRequest(requestGuid: string, reason: string): Promise<void> {
    const url = `${base}${endpoints.rejectRequest}`;
    try {
      await httpService.post(url, { requestGuid, reason });
    } catch (error) {
      throw error;
    }
  }

  async SaveRequest(request: RequestDetailsModel): Promise<void> {
    try {
      const url = `${base}${endpoints.saveRequest}`;
      const formData = new FormData();
      formData.append("contractType", request.contractType);
      formData.append("endDate", request.endDate.toISOString().split("T")[0]);
      formData.append(
        "startDate",
        request.startDate.toISOString().split("T")[0]
      );
      formData.append("guid", request.guid || "");
      formData.append("siteId", request.siteId.toString());
      formData.append("departmentId", request.departmentId.toString());
      formData.append("desiredProfile", request.desiredProfile);
      formData.append(
        "desiredStartDate",
        request.desiredStartDate.toISOString().split("T")[0]
      );
      formData.append("justification", request.justification);
      formData.append("numberOfProfiles", request.numberOfProfiles.toString());

      if (request.cvFile) {
        formData.append("cvFile", request.cvFile);
      }
      formData.append("candidateFirstName", request.candidateFirstName || "");
      formData.append("candidateLastName", request.candidateLastName || "");
      if (request.cvFile) {
        await httpService.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await httpService.post(url, formData);
      }
    } catch (error) {
      throw error;
    }
  }
}

export const requestHttpRepository = new RequestHttpRepository();
