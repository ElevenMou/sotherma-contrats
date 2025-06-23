import HttpService from "@/lib/http/http.service";
import type { IRequestRepository } from "./request.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { RequestListItemModel } from "./model/response/RequestModel";
import type { RequestDetailsModel } from "./model/request/RequestDetailsModel";
import type { RequestTimeLineModel } from "./model/response/RequestTimeLineModel";
import { formatLocalDate } from "@/lib/utils";
import type { GetProfileFileRequestModel } from "./model/request/GetProfileFileRequestModel";
import type { GetProfileFileResponseModel } from "./model/response/GetProfileFileResponseModel";

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
      formData.append("endDate", formatLocalDate(request.endDate));
      formData.append("startDate", formatLocalDate(request.startDate));

      formData.append("guid", request.guid || "");
      formData.append("siteId", request.site.toString());
      formData.append("departmentId", request.department.toString());
      formData.append("desiredProfile", request.desiredProfile);
      formData.append("justification", request.justification);
      formData.append("numberOfProfiles", request.numberOfProfiles.toString());
      request.contractGuid &&
        formData.append("contractGuid", request.contractGuid || "");

      if (request.recommendedProfiles) {
        request.recommendedProfiles.forEach((profile, index) => {
          if (profile.cvFile) {
            formData.append(
              `recommendedProfiles[${index}].cvFile`,
              profile.cvFile
            );
          }
          formData.append(
            `recommendedProfiles[${index}].candidateFirstName`,
            profile.candidateFirstName
          );
          formData.append(
            `recommendedProfiles[${index}].candidateLastName`,
            profile.candidateLastName
          );
          if (profile.guid) {
            formData.append(`recommendedProfiles[${index}].guid`, profile.guid);
          }
        });
      }

      await httpService.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async GetRequestDetails(requestGuid: string): Promise<RequestDetailsModel> {
    const url = generateUrl(`${base}${endpoints.requestDetails}`, {
      guid: requestGuid,
    });
    try {
      return httpService.get<RequestDetailsModel>(url);
    } catch (error) {
      throw error;
    }
  }

  async GetRequestTimeline(
    requestGuid: string
  ): Promise<RequestTimeLineModel[]> {
    const url = generateUrl(`${base}${endpoints.timeline}`, {
      guid: requestGuid,
    });
    try {
      return httpService.get<RequestTimeLineModel[]>(url);
    } catch (error) {
      throw error;
    }
  }

  async GetProfileFile(
    request: GetProfileFileRequestModel
  ): Promise<GetProfileFileResponseModel> {
    const url = generateUrl(`${base}${endpoints.getProfileFile}`, {
      guid: request.guid,
    });

    try {
      return httpService.get<GetProfileFileResponseModel>(url);
    } catch (error) {
      throw error;
    }
  }
}

export const requestHttpRepository = new RequestHttpRepository();
