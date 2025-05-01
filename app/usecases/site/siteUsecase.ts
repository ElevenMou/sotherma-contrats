import { siteHttpRepository } from "@/data/sites/sites.repository";
import type {
  SiteUseCaseInterface,
  GetAllSitesView,
  GetSitesListView,
  GetSiteDetailsView,
  SaveSiteView,
} from "./siteUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { GetSiteDetailsRequestModel } from "@/data/sites/model/request/GetSiteDetailsRequestModel";
import type { SiteDetailsModel } from "@/data/sites/model/response/SitesListItemModel";

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

  const getSiteDetails = async ({
    request,
    view,
  }: {
    request: GetSiteDetailsRequestModel;
    view: GetSiteDetailsView;
  }) => {
    view.setLoading(true);
    try {
      const response = await siteHttpRepository.GetSiteDetails(request);
      view.setSiteDetails(response);
    } catch (error) {
      toast.error(t("sites.errors.listFetch.title"), {
        description: t("sites.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const saveSite = async ({
    request,
    view,
  }: {
    request: SiteDetailsModel;
    view: SaveSiteView;
  }) => {
    try {
      await siteHttpRepository.SaveSite(request);
      toast.success(t("sites.success.saveSite.title"), {
        description: t("sites.success.saveSite.description"),
      });
      view.onSaveSuccess();
    } catch (error) {
      toast.error(t("sites.errors.saveSite.title"), {
        description: t("sites.errors.saveSite.description"),
      });
    }
  };

  return { getAllSites, getSitesList, getSiteDetails, saveSite };
};
