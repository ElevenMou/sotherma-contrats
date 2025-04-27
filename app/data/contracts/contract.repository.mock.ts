import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import { contracts } from "./contracts";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ContractListItemModel } from "./model/response/ContractListItemModel";

const { ContractsAPI } = getEnvironment();
const { base, endpoints } = ContractsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const ContractRepositoryMock = [
  http.post(`${baseUrl}${endpoints.save}`, () => {
    return HttpResponse.json("Contract saved successfully", {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.list}`, ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const paginatedContracts = contracts.slice(
      startIndex,
      startIndex + maxRecords
    );

    const totalRecords = contracts.length;

    const response: ListResponseModel<ContractListItemModel, "contractList"> = {
      contractList: paginatedContracts,
      totalCount: totalRecords,
    };

    return HttpResponse.json(response, {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.close}`, ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const guid = searchParams.get("guid") || "";

    const contractIndex = contracts.findIndex(
      (contract) => contract.guid === guid
    );

    if (contractIndex === -1) {
      return HttpResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }

    contracts.splice(contractIndex, 1);

    return HttpResponse.json("Contract closed successfully", {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.extend}`, () => {
    return HttpResponse.json("Contract extended successfully", {
      status: 200,
    });
  }),
];
