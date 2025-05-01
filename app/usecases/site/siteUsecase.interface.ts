import type { GetSiteDetailsRequestModel } from "@/data/sites/model/request/GetSiteDetailsRequestModel";
import type { AllSitesItemModel } from "@/data/sites/model/response/AllSitesItemModel";
import type { SiteDetailsModel } from "@/data/sites/model/response/SitesListItemModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface GetAllSitesView {
  setSites: (sites: AllSitesItemModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface GetSitesListView {
  setLoading: (loading: boolean) => void;
  setSitesList: (sitesList: SiteDetailsModel[]) => void;
  setTotalCount: (totalCount: number) => void;
}

export interface GetSiteDetailsView {
  setLoading: (loading: boolean) => void;
  setSiteDetails: (siteDetails: SiteDetailsModel) => void;
}

export interface SaveSiteView {
  onSaveSuccess: () => void;
}

export interface SiteUseCaseInterface {
  getAllSites: ({ view }: { view: GetAllSitesView }) => Promise<void>;

  getSitesList: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetSitesListView;
  }) => Promise<void>;

  getSiteDetails: ({
    request,
    view,
  }: {
    request: GetSiteDetailsRequestModel;
    view: GetSiteDetailsView;
  }) => Promise<void>;

  saveSite: ({
    request,
    view,
  }: {
    request: SiteDetailsModel;
    view: SaveSiteView;
  }) => Promise<void>;
}
