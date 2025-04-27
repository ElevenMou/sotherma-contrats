import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import {
  userRoles,
  type CurrentUserInfoModel,
} from "./model/response/CurrentUserInfoResponseModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { UserDetailsModel } from "./model/response/UserDetailsModel";
import { employees } from "./employees";

const { UserAPI } = getEnvironment();
const { base, endpoints } = UserAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const UserRepositoryMock = [
  http.get(`${baseUrl}${endpoints.userInfo}`, async () => {
    const responseDto: CurrentUserInfoModel = {
      firstName: "Moussa",
      lastName: "Saidi",
      email: "moussa.saidi.01@gmail.com",
      profile: userRoles.admin,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.usersList}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const totalCount = employees.length;

    const paginatedEmployees = employees.slice(
      startIndex,
      startIndex + maxRecords
    );

    const responseDto: ListResponseModel<UserDetailsModel, "usersList"> = {
      totalCount,
      usersList: paginatedEmployees,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.userDetails}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const guid = searchParams.get("guid") || "";

    const user = employees.find((user) => user.guid === guid);

    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    const responseDto: UserDetailsModel = user;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(
      { ...responseDto, department: 1, site: 2 },
      {
        status: 200,
      }
    );
  }),

  http.post(`${baseUrl}${endpoints.save}`, async ({}) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json("success", {
      status: 200,
    });
  }),
];
