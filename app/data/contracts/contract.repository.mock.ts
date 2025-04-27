import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";

const { ContractsAPI } = getEnvironment();
const { base, endpoints } = ContractsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const ContractRepositoryMock = [
  http.post(`${baseUrl}${endpoints.save}`, () => {
    return HttpResponse.json("Contract saved successfully", {
      status: 200,
    });
  }),
];
