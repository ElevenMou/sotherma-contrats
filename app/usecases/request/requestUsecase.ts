import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetRequestsListView,
  RequestUseCaseInterface,
} from "./requestUsecase.interface";
import { useRequestsContext } from "@/pages/protected/requests/contexts/RequestsProvider";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { requestHttpRepository } from "@/data/requests/request.repository";
import type { ChangeRequestStatusModel } from "@/data/requests/model/request/ChangeRequestStatusModel";

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

  const acceptRequest = async ({
    request,
  }: {
    request: ChangeRequestStatusModel;
  }) => {
    try {
      await requestHttpRepository.AcceptRequest(request.requestGuid);
      toast.error(t("requests.success.rejectRequest.title"), {
        description: t("requests.success.rejectRequest.description"),
      });
    } catch (error) {
      toast.error(t("requests.errors.acceptRequest.title"), {
        description: t("requests.errors.acceptRequest.description"),
      });
    }
  };

  const rejectRequest = async ({
    request,
  }: {
    request: ChangeRequestStatusModel;
  }) => {
    try {
      await requestHttpRepository.RejectRequest(
        request.requestGuid,
        request.reason || ""
      );
      toast.error(t("requests.success.rejectRequest.title"), {
        description: t("requests.success.rejectRequest.description"),
      });
    } catch (error) {
      toast.error(t("requests.errors.rejectRequest.title"), {
        description: t("requests.errors.rejectRequest.description"),
      });
    }
  };

  return {
    getRequestsList,
    getRequestsListToValidate,
    acceptRequest,
    rejectRequest,
  };
};
