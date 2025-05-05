import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { DepartmentManagementDetailsModel } from "./model/request/DepartmentManagementDetailsModel";
import type { GetDepartmentManagementUsersListModel } from "./model/response/GetDepartmentManagementUsersListModel";

const { DepartmentManagementAPI } = getEnvironment();
const { base, endpoints } = DepartmentManagementAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const DepartmentManagementRepositoryMock = [
  http.post(`${baseUrl}${endpoints.save}`, async () => {
    return HttpResponse.json(null, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.details}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const guid = searchParams.get("guid") || "1";

    const responseDto: DepartmentManagementDetailsModel = {
      departmentGuid: guid,
      departmentName: "HR",
      firstValidatorId: "1",
      secondValidatorId: "2",
      hrId: "3",
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.getUsersList}`, async () => {
    const responseDto: GetDepartmentManagementUsersListModel = {
      validatorsList: [
        { userId: 1, userFullName: "John Doe", userSite: "Site A" },
        { userId: 2, userFullName: "Jane Smith", userSite: "Site B" },
        { userId: 3, userFullName: "Alice Johnson", userSite: "Site C" },
        { userId: 4, userFullName: "Bob Brown", userSite: "Site D" },
        { userId: 5, userFullName: "Charlie Davis", userSite: "Site E" },
      ],
      hrList: [
        { userId: 6, userFullName: "David Wilson", userSite: "Site F" },
        { userId: 7, userFullName: "Eva Martinez", userSite: "Site G" },
        { userId: 8, userFullName: "Frank Garcia", userSite: "Site H" },
        { userId: 9, userFullName: "Grace Lee", userSite: "Site I" },
        { userId: 10, userFullName: "Henry Taylor", userSite: "Site J" },
      ],
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
