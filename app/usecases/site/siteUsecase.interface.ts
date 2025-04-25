import type { SiteModel } from "@/data/sites/model/response/SiteModel";

export interface GetAllSitesView {
  setSites: (sites: SiteModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface SiteUseCaseInterface {
  getAllSites: ({ view }: { view: GetAllSitesView }) => Promise<void>;
}
