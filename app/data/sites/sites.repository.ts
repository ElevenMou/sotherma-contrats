import HttpService from "@/lib/http/http.service";
import { getEnvironment } from "../environment";
import type { ISiteRepository } from "./sites.repository.interface";
import type { SiteModel } from "./model/response/SiteModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { SitesAPI } = getEnvironment();
const { base, endpoints } = SitesAPI;

class SiteHttpRepository implements ISiteRepository {
  async GetAllSites(): Promise<SiteModel[]> {
    const url = `${base}${endpoints.sitesList}`;
    try {
      const response = await httpService.get<SiteModel[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const siteHttpRepository = new SiteHttpRepository();
