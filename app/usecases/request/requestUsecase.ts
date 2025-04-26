import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetRequestsListView,
  RequestUseCaseInterface,
} from "./requestUsecase.interface";
import { useRequestsContext } from "@/pages/protected/requests/contexts/RequestsProvider";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { requestHttpRepository } from "@/data/requests/request.repository";

export const useRequestUsecase = (): RequestUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useRequestsContext();

  const getRequestsList = async ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetRequestsListView;
  }) => {
    view.setLoading(true);
    try {
      const response = await requestHttpRepository.GetListByUser(request);
      ctx.setRequests(response.requestList);
      ctx.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("requests.errors.listFetch.title"), {
        description: t("requests.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const getRequestsListToValidate = async ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetRequestsListView;
  }) => {
    view.setLoading(true);
    try {
      const response = await requestHttpRepository.GetListToValidateByUser(
        request
      );
      ctx.setRequestsToValidate(response.requestList);
      ctx.setRequestsToValidateCount(response.totalCount);
    } catch (error) {
      toast.error(t("requests.errors.listFetch.title"), {
        description: t("requests.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return { getRequestsList, getRequestsListToValidate };
};
