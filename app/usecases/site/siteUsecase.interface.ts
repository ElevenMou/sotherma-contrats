import type { AllSitesItemModel } from "@/data/sites/model/response/AllSitesItemModel";
import type { SitesListItemModel } from "@/data/sites/model/response/SitesListItemModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface GetAllSitesView {
  setSites: (sites: AllSitesItemModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface GetSitesListView {
  setLoading: (loading: boolean) => void;
  setSitesList: (sitesList: SitesListItemModel[]) => void;
  setTotalCount: (totalCount: number) => void;
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
}
