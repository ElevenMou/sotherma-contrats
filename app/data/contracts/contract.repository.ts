import HttpService from "@/lib/http/http.service";
import type { IContractRepository } from "./contract.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ContractListItemModel } from "./model/response/ContractListItemModel";
import type { GetContractDetailsRequestModel } from "./model/request/GetContractDetailsRequestModel";
import { formatLocalDate } from "@/lib/utils";
import type { GetCvFileResponseModel } from "./model/response/GetCvFileResponseModel";
import type { GetCvFileRequestModel } from "./model/request/GetCvFileRequestModel";
import type { CloseContractRequestModel } from "./model/request/CloseContractRequestModel";
import type { ExtendContractRequestModel } from "./model/request/ExtendContractRequestModel";
import type { ClosingContractRequestListItemModel } from "./model/response/ClosingContractRequestListItemModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { ContractsAPI } = getEnvironment();
const { base, endpoints } = ContractsAPI;

class ContractHttpRepository implements IContractRepository {
  async SaveContract(contract: ContractDetailsModel): Promise<void> {
    try {
      const url = `${base}${endpoints.save}`;

      const formData = new FormData();
      formData.append("guid", contract.guid || "");
      formData.append("requestGuid", contract.requestGuid);
      formData.append("endDate", formatLocalDate(contract.endDate));
      formData.append("startDate", formatLocalDate(contract.startDate));
      formData.append("contractType", contract.contractType);
      formData.append("contractedFirstName", contract.contractedFirstName);
      formData.append("contractedLastName", contract.contractedLastName);
      formData.append("contractedPhone", contract.contractedPhone);
      if (contract.cvFile) {
        formData.append("cvFile", contract.cvFile);
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

  async GetList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<ContractListItemModel, "contractList">> {
    try {
      const url = generateUrl(`${base}${endpoints.list}`, {
        maxRecords: request.maxRecords.toString(),
        startIndex: request.startIndex.toString(),
      });
      const response = await httpService.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async CloseContract(request: CloseContractRequestModel): Promise<void> {
    try {
      const url = generateUrl(`${base}${endpoints.close}`, {
        guid: request.contractGuid,
        closingReason: request.closingReason,
      });
      await httpService.post(url);
    } catch (error) {
      throw error;
    }
  }

  async CloseContractRequest(
    request: CloseContractRequestModel
  ): Promise<void> {
    try {
      const url = `${base}${endpoints.closeRequest}`;
      await httpService.post(url, {
        guid: request.contractGuid,
        reason: request.closingReason,
      });
    } catch (error) {
      throw error;
    }
  }

  async ExtendContract(request: ExtendContractRequestModel): Promise<void> {
    try {
      const url = generateUrl(`${base}${endpoints.extend}`, {
        guid: request.guid,
        newEndDate: new Date(request.newEndDate).toISOString().split("T")[0],
      });
      await httpService.post(url);
    } catch (error) {
      throw error;
    }
  }

  async GetContractDetails(
    request: GetContractDetailsRequestModel
  ): Promise<ContractDetailsModel> {
    try {
      const url = generateUrl(`${base}${endpoints.details}`, {
        guid: request.guid,
      });
      const response = await httpService.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetCandidateCV({
    request,
  }: {
    request: GetCvFileRequestModel;
  }): Promise<GetCvFileResponseModel> {
    try {
      const url = generateUrl(`${base}${endpoints.getCandidateCV}`, {
        guid: request.guid,
      });
      const response = await httpService.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetClosingContractsRequestsList(
    request: ListPaginationRequestModel
  ): Promise<
    ListResponseModel<
      ClosingContractRequestListItemModel,
      "closingContractRequestList"
    >
  > {
    try {
      const url = generateUrl(`${base}${endpoints.closingRequests}`, {
        maxRecords: request.maxRecords.toString(),
        startIndex: request.startIndex.toString(),
      });
      const response = await httpService.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async ApproveClosingContractRequest(guid: string): Promise<void> {
    try {
      const url = generateUrl(`${base}${endpoints.approveRequest}`, {
        guid,
      });
      await httpService.post(url);
    } catch (error) {
      throw error;
    }
  }

  async RejectClosingContractRequest(guid: string): Promise<void> {
    try {
      const url = generateUrl(`${base}${endpoints.rejectRequest}`, {
        guid,
      });
      await httpService.post(url);
    } catch (error) {
      throw error;
    }
  }
}

export const contractHttpRepository = new ContractHttpRepository();
