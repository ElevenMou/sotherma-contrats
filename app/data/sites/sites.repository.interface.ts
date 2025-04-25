import type { SiteModel } from "./model/response/SiteModel";

export interface ISiteRepository {
  GetAllSites(): Promise<SiteModel[]>;
}
