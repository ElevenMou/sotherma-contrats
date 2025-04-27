import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetRequestsListView,
  RequestUseCaseInterface,
  SaveRequestView,
} from "./requestUsecase.interface";
import { useRequestsContext } from "@/pages/protected/requests/contexts/RequestsProvider";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { requestHttpRepository } from "@/data/requests/request.repository";
import type { ChangeRequestStatusModel } from "@/data/requests/model/request/ChangeRequestStatusModel";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";

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
      toast.success(t("requests.success.rejectRequest.title"), {
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
      toast.success(t("requests.success.rejectRequest.title"), {
        description: t("requests.success.rejectRequest.description"),
      });
    } catch (error) {
      toast.error(t("requests.errors.rejectRequest.title"), {
        description: t("requests.errors.rejectRequest.description"),
      });
    }
  };

  const saveRequest = async ({
    request,
    view,
  }: {
    request: RequestDetailsModel;
    view: SaveRequestView;
  }) => {
    try {
      await requestHttpRepository.SaveRequest(request);
      toast.success(t("requests.success.saveRequest.title"), {
        description: t("requests.success.saveRequest.description"),
      });
      view.navigateToRequestsList();
    } catch (error) {
      console.log(error);

      toast.error(t("requests.errors.saveRequest.title"), {
        description: t("requests.errors.saveRequest.description"),
      });
    }
  };

  return {
    getRequestsList,
    getRequestsListToValidate,
    acceptRequest,
    rejectRequest,
    saveRequest,
  };
};
