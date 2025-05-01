import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { SitesListItemModel } from "./model/response/SitesListItemModel";

const { SitesAPI } = getEnvironment();
const { base, endpoints } = SitesAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const SiteRepositoryMock = [
  http.get(`${baseUrl}${endpoints.allSites}`, async () => {
    const responseDto: AllSitesItemModel[] = [
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

  http.get(`${baseUrl}${endpoints.sitesList}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const responseDto: ListResponseModel<SitesListItemModel, "siteList"> = {
      totalCount: 10,
      siteList: [
        {
          code: "SD",
          name: "San Diego",
          guid: "1",
        },
        {
          code: "PHX",
          name: "Phoenix",
          guid: "2",
        },
        {
          code: "ATL",
          name: "Atlanta",
          guid: "3",
        },
        {
          code: "ORL",
          name: "Orlando",
          guid: "4",
        },
        {
          code: "DAL",
          name: "Dallas",
          guid: "5",
        },
        {
          code: "PHI",
          name: "Philadelphia",
          guid: "6",
        },
        {
          code: "NYC",
          name: "New York",
          guid: "7",
        },
        {
          code: "LA",
          name: "Los Angeles",
          guid: "8",
        },
        {
          code: "CHI",
          name: "Chicago",
          guid: "9",
        },
        {
          code: "HOU",
          name: "Houston",
          guid: "10",
        },
      ],
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
