import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { SiteModel } from "./model/response/SiteModel";

const { SitesAPI } = getEnvironment();
const { base, endpoints } = SitesAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const SiteRepositoryMock = [
  http.get(`${baseUrl}${endpoints.sitesList}`, async () => {
    const responseDto: SiteModel[] = [
      {
        id: "1",
        name: "San Diego",
      },
      {
        id: "2",
        name: "Phoenix",
      },
      {
        id: "3",
        name: "Atlanta",
      },
      {
        id: "4",
        name: "Orlando",
      },
      {
        id: "5",
        name: "Dallas",
      },
      {
        id: "6",
        name: "Philadelphia",
      },
      {
        id: "7",
        name: "New York",
      },
      {
        id: "8",
        name: "Los Angeles",
      },
      {
        id: "9",
        name: "Chicago",
      },
      {
        id: "10",
        name: "Houston",
      },
      {
        id: "11",
        name: "Miami",
      },
      {
        id: "12",
        name: "Seattle",
      },
      {
        id: "13",
        name: "Boston",
      },
      {
        id: "14",
        name: "San Francisco",
      },
      {
        id: "15",
        name: "Washington D.C.",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
