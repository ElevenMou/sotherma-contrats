import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { GetSiteDetailsRequestModel } from "./model/request/GetSiteDetailsRequestModel";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { SiteDetailsModel } from "./model/response/SitesListItemModel";

export interface ISiteRepository {
  GetAllSites(): Promise<AllSitesItemModel[]>;

  GetSitesList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<SiteDetailsModel, "siteList">>;

  GetSiteDetails(
    request: GetSiteDetailsRequestModel
  ): Promise<SiteDetailsModel>;

  SaveSite(request: SiteDetailsModel): Promise<void>;
}
