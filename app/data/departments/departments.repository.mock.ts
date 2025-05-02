import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { DepartmentSlectItemModel } from "./model/response/DepartmentSlectItemModel";
import { departmentList } from "./departments";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { DepartmentListItemModel } from "./model/response/DepartmentListItemModel";

const { DepartmentsAPI } = getEnvironment();
const { base, endpoints } = DepartmentsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const DepartmentRepositoryMock = [
  http.get(`${baseUrl}${endpoints.departmentsList}`, async () => {
    const responseDto: DepartmentSlectItemModel[] = [
      {
        id: "1",
        name: "HR",
      },
      {
        id: "2",
        name: "IT",
      },
      {
        id: "3",
        name: "Finance",
      },
      {
        id: "4",
        name: "Marketing",
      },
      {
        id: "5",
        name: "Sales",
      },
      {
        id: "6",
        name: "Support",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.getList}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const totalCount = departmentList.length;

    const departmentsList = departmentList.slice(
      startIndex,
      startIndex + maxRecords
    );

    const responseDto: ListResponseModel<
      DepartmentListItemModel,
      "departmentsList"
    > = {
      totalCount,
      departmentsList,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
