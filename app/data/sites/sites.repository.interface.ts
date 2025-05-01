import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { AllSitesItemModel } from "./model/response/AllSitesItemModel";
import type { SitesListItemModel } from "./model/response/SitesListItemModel";

export interface ISiteRepository {
  GetAllSites(): Promise<AllSitesItemModel[]>;
  GetSitesList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<SitesListItemModel, "siteList">>;
}
