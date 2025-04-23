import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { AuthenticateResponseModel } from "./model/response/AuthenticateResponseModel";
import {
  userRoles,
  type UserInfoModel,
} from "./model/response/UserInfoResponseModel";

const { AuthAPI } = getEnvironment();
const { base, endpoints } = AuthAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const AuthRepositoryMock = [
  http.post(`${baseUrl}${endpoints.authenticate}`, async () => {
    const responseDto: AuthenticateResponseModel = {
      access_token: "access_token",
      refresh_token: "refresh_token",
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.userInfo}`, async () => {
    const responseDto: UserInfoModel = {
      name: "Moussa Saidi",
      email: "moussa.saidi.01@gmail.com",
      profile: userRoles.admin,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
