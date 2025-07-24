import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetRequestDetailsView,
  GetRequestsListView,
  GetRequestTimelineView,
  RequestUseCaseInterface,
  SaveRequestView,
} from "./requestUsecase.interface";
import { useRequestsContext } from "@/pages/protected/requests/contexts/RequestsProvider";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { requestHttpRepository } from "@/data/requests/request.repository";
import type { ChangeRequestStatusModel } from "@/data/requests/model/request/ChangeRequestStatusModel";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import type { GetProfileFileRequestModel } from "@/data/requests/model/request/GetProfileFileRequestModel";
import { isAxiosError } from "axios";
import type { NotifyProviderRequestModel } from "@/data/requests/model/request/NotifyProviderRequestModel";
import downloadFile from "@/data/utils/DowloandFile";
import { useNavigate } from "react-router";
import { routes } from "@/lib/router/routes";

export const useRequestUsecase = (): RequestUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useRequestsContext();
  const navigate = useNavigate();

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
      if (isAxiosError(error) && error.response?.data === "Invalid Data") {
        toast.error(t("requests.errors.noDepartementManager.title"), {
          description: t("requests.errors.noDepartementManager.description"),
        });
      } else
        toast.error(t("requests.errors.saveRequest.title"), {
          description: t("requests.errors.saveRequest.description"),
        });
    }
  };

  const getRequestDetails = async ({
    requestGuid,
    view,
  }: {
    requestGuid: string;
    view: GetRequestDetailsView;
  }) => {
    view.setLoading(true);
    try {
      const response = await requestHttpRepository.GetRequestDetails(
        requestGuid
      );
      view.setRequestDetails(response);
    } catch (error) {
      toast.error(t("requests.errors.requestDetails.title"), {
        description: t("requests.errors.requestDetails.description"),
      });
      navigate(routes.requests);
    } finally {
      view.setLoading(false);
    }
  };

  const getRequestTimeline = async ({
    requestGuid,
    view,
  }: {
    requestGuid: string;
    view: GetRequestTimelineView;
  }) => {
    view.setLoading(true);
    try {
      const response = await requestHttpRepository.GetRequestTimeline(
        requestGuid
      );
      view.setRequestTimeline(response);
    } catch (error) {
      toast.error(t("requests.errors.listFetch.title"), {
        description: t("requests.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const downloadProfileFile = async ({
    request,
    view,
  }: {
    request: GetProfileFileRequestModel;
    view: GetRequestsListView;
  }) => {
    try {
      view.setLoading(true);
      const response = await requestHttpRepository.GetProfileFile(request);
      downloadFile(response.fileName, response.fileContent);
    } catch (error) {
      toast.error(t("requests.errors.downloadFile.title"), {
        description: t("requests.errors.downloadFile.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const notifyProvider = async ({
    request,
    view,
  }: {
    request: NotifyProviderRequestModel;
    view: GetRequestsListView;
  }) => {
    try {
      view.setLoading(true);
      await requestHttpRepository.NotifyProvider(request);
      toast.success(t("requests.success.notifyProvider.title"), {
        description: t("requests.success.notifyProvider.description"),
      });
    } catch (error) {
      toast.error(t("requests.errors.notifyProvider.title"), {
        description: t("requests.errors.notifyProvider.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    getRequestsList,
    getRequestsListToValidate,
    acceptRequest,
    rejectRequest,
    saveRequest,
    getRequestDetails,
    getRequestTimeline,
    downloadProfileFile,
    notifyProvider,
  };
};
