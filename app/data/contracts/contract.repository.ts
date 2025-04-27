import HttpService from "@/lib/http/http.service";
import type { IContractRepository } from "./contract.repository.interface";
import { generateUrl, getEnvironment } from "../environment";
import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";

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
      formData.append(
        "startDate",
        contract.startDate.toISOString().split("T")[0]
      );
      formData.append("endDate", contract.endDate.toISOString().split("T")[0]);
      formData.append("contractType", contract.contractType);
      formData.append("providerFirstName", contract.providerFirstName);
      formData.append("providerLastName", contract.providerLastName);
      formData.append("providerEmail", contract.providerEmail);
      formData.append("cvFile", contract.cvFile);

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
  ): Promise<ListResponseModel<ContractDetailsModel, "contractList">> {
    try {
      const url = generateUrl(`${base}${endpoints.list}`, {
        maxRecords: request.maxRecords.toString(),
        startIndex: request.startIndex.toString(),
      });
      const response = await httpService.post(url, request);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const contractHttpRepository = new ContractHttpRepository();
