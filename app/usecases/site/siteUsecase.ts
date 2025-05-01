import { siteHttpRepository } from "@/data/sites/sites.repository";
import type {
  SiteUseCaseInterface,
  GetAllSitesView,
  GetSitesListView,
} from "./siteUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export const useSiteUseCase = (): SiteUseCaseInterface => {
  const { t } = useTranslation();

  const getAllSites = async ({ view }: { view: GetAllSitesView }) => {
    view.setLoading(true);
    try {
      const response = await siteHttpRepository.GetAllSites();
      view.setSites(response);
    } catch (error) {
      toast.error(t("sites.errors.listFetch.title"), {
        description: t("sites.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const getSitesList = async ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetSitesListView;
  }) => {
    view.setLoading(true);
    try {
      const response = await siteHttpRepository.GetSitesList(request);
      view.setSitesList(response.siteList);
      view.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("sites.errors.listFetch.title"), {
        description: t("sites.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return { getAllSites, getSitesList };
};
