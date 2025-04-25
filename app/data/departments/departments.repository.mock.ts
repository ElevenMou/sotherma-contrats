import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { DepartmentModel } from "./model/response/DepartmentModel";

const { DepartmentsAPI } = getEnvironment();
const { base, endpoints } = DepartmentsAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const DepartmentRepositoryMock = [
  http.get(`${baseUrl}${endpoints.departmentsList}`, async () => {
    const responseDto: DepartmentModel[] = [
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
];
