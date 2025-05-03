import { siteHttpRepository } from "@/data/sites/sites.repository";
import type {
  SiteUseCaseInterface,
  GetAllSitesView,
  GetSiteDetailsView,
  SaveSiteView,
} from "./siteUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { GetSiteDetailsRequestModel } from "@/data/sites/model/request/GetSiteDetailsRequestModel";
import type { SiteDetailsModel } from "@/data/sites/model/response/SitesListItemModel";
import {
  SITES_MAX_RECORDS,
  useSitesContext,
} from "@/pages/protected/admin/sites/contexts/SitesProvider";

export const useSiteUseCase = (): SiteUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useSitesContext();

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
  }: {
    request: ListPaginationRequestModel;
  }) => {
    ctx.setLoading(true);
    try {
      const response = await siteHttpRepository.GetSitesList(request);
      ctx.setSites(response.siteList);
      ctx.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("sites.errors.listFetch.title"), {
        description: t("sites.errors.listFetch.description"),
      });
    } finally {
      ctx.setLoading(false);
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
      await getSitesList({
        request: {
          startIndex: 0,
          maxRecords: SITES_MAX_RECORDS,
        },
      });
    } catch (error) {
      toast.error(t("sites.errors.saveSite.title"), {
        description: t("sites.errors.saveSite.description"),
      });
    }
  };

  return { getAllSites, getSitesList, getSiteDetails, saveSite };
};
