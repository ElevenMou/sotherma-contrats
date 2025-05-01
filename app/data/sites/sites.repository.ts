import HttpService from "@/lib/http/http.service";
import { generateUrl, getEnvironment } from "../environment";
import type { ISiteRepository } from "./sites.repository.interface";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { SiteDetailsModel } from "./model/response/SitesListItemModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { SitesAPI } = getEnvironment();
const { base, endpoints } = SitesAPI;

class SiteHttpRepository implements ISiteRepository {
  async GetAllSites(): Promise<AllSitesItemModel[]> {
    const url = `${base}${endpoints.allSites}`;
    try {
      const response = await httpService.get<AllSitesItemModel[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetSitesList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<SiteDetailsModel, "siteList">> {
    const url = generateUrl(`${base}${endpoints.sitesList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      const response = await httpService.get<
        ListResponseModel<SiteDetailsModel, "siteList">
      >(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetSiteDetails(request: { guid: string }): Promise<SiteDetailsModel> {
    const url = generateUrl(`${base}${endpoints.siteDetails}`, {
      guid: request.guid,
    });
    try {
      const response = await httpService.get<SiteDetailsModel>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async SaveSite(request: SiteDetailsModel): Promise<void> {
    const url = `${base}${endpoints.saveSite}`;
    try {
      await httpService.post(url, request);
    } catch (error) {
      throw error;
    }
  }
}

export const siteHttpRepository = new SiteHttpRepository();
