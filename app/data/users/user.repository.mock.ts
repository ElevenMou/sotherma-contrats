import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import {
  userRoles,
  type CurrentUserInfoModel,
} from "./model/response/CurrentUserInfoResponseModel";

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
];
