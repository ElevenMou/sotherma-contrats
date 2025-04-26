import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import { requests } from "./requests";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { RequestListItemModel } from "./model/response/RequestModel";

const { RequestsAPI } = getEnvironment();
const { base, endpoints } = RequestsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const RequestRepositoryMock = [
  http.get(`${baseUrl}${endpoints.listByUser}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const totalCount = requests.length;

    const requestList = requests.slice(startIndex, startIndex + maxRecords);

    const responseDto: ListResponseModel<RequestListItemModel, "requestList"> =
      {
        totalCount,
        requestList,
      };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.listToValidate}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const totalCount = requests.length;

    const requestList = requests.slice(startIndex, startIndex + maxRecords);

    const responseDto: ListResponseModel<RequestListItemModel, "requestList"> =
      {
        totalCount,
        requestList,
      };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.acceptRequest}`, async () => {
    return HttpResponse.json("Accepted", {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.rejectRequest}`, async () => {
    return HttpResponse.json("Rejected", {
      status: 200,
    });
  }),
];
