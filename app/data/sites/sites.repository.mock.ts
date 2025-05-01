import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { SiteDetailsModel } from "./model/response/SitesListItemModel";
import { sites } from "./sites";

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

    const paginatedSites = sites.slice(startIndex, startIndex + maxRecords);

    const responseDto: ListResponseModel<SiteDetailsModel, "siteList"> = {
      totalCount: sites.length,
      siteList: paginatedSites,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.siteDetails}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const guid = searchParams.get("guid");

    const site = sites.find((site) => site.guid === guid);
    if (!site) {
      return HttpResponse.json({ error: "Site not found" }, { status: 404 });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(site, {
      status: 200,
    });
  }),

  http.post(`${baseUrl}${endpoints.saveSite}`, async () => {
    return HttpResponse.json("Site saved successfully", { status: 200 });
  }),
];
