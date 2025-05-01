import HttpService from "@/lib/http/http.service";
import { generateUrl, getEnvironment } from "../environment";
import type { ISiteRepository } from "./sites.repository.interface";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { SitesListItemModel } from "./model/response/SitesListItemModel";

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
  ): Promise<ListResponseModel<SitesListItemModel, "siteList">> {
    const url = generateUrl(`${base}${endpoints.sitesList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });

    try {
      const response = await httpService.get<
        ListResponseModel<SitesListItemModel, "siteList">
      >(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const siteHttpRepository = new SiteHttpRepository();
