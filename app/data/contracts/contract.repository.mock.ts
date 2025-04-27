import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import { contracts } from "./contracts";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";

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

    const response: ListResponseModel<ContractDetailsModel, "contractList"> = {
      contractList: paginatedContracts,
      totalCount: totalRecords,
    };

    return HttpResponse.json(response, {
      status: 200,
    });
  }),
];
