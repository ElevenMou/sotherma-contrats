import { siteHttpRepository } from "@/data/sites/sites.repository";
import type {
  SiteUseCaseInterface,
  GetAllSitesView,
} from "./siteUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useSiteUseCase = (): SiteUseCaseInterface => {
  const { t } = useTranslation();

  const getAllSites = async ({ view }: { view: GetAllSitesView }) => {
    view.setLoading(true);
    try {
      const response = await siteHttpRepository.GetAllSites();
      view.setSites(response);
    } catch (error) {
      toast.error(t("employees.errors.listSites.title"), {
        description: t("employees.errors.listSites.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return { getAllSites };
};
