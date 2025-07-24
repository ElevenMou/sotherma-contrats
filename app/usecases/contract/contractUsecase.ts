import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { contractHttpRepository } from "@/data/contracts/contract.repository";
import type {
  ContractUseCaseInterface,
  GetContractDetailsView,
  GetListView,
  LoadingView,
  SaveContractView,
} from "./contractUsecase.interface";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { ExtendContractRequestModel } from "@/data/contracts/model/request/ExtendContractRequestModel";
import type { GetContractDetailsRequestModel } from "@/data/contracts/model/request/GetContractDetailsRequestModel";
import type { GetCvFileRequestModel } from "@/data/contracts/model/request/GetCvFileRequestModel";
import downloadFile from "@/data/utils/DowloandFile";
import type { CloseContractRequestModel } from "@/data/contracts/model/request/CloseContractRequestModel";

export const useContractUsecase = (): ContractUseCaseInterface => {
  const { t } = useTranslation();

  const saveContract = async ({
    request,
    view,
  }: {
    request: ContractDetailsModel;
    view: SaveContractView;
  }) => {
    try {
      await contractHttpRepository.SaveContract(request);
      toast.success(t("contracts.success.saveContract.title"), {
        description: t("contracts.success.saveContract.description"),
      });
      view.navigateToContractsList();
    } catch (error) {
      toast.error(t("contracts.errors.saveContract.title"), {
        description: t("contracts.errors.saveContract.description"),
      });
    }
  };

  const getList = async ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetListView;
  }) => {
    try {
      view.setLoading(true);
      const response = await contractHttpRepository.GetList(request);
      view.setContractsList(response.contractList);
      view.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("contracts.errors.listFetch.title"), {
        description: t("contracts.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const closeContract = async ({
    request,
    view,
  }: {
    request: CloseContractRequestModel;
    view: {
      onSuccess: () => void;
    };
  }) => {
    try {
      await contractHttpRepository.CloseContract(request);
      toast.success(t("contracts.success.closeContract.title"), {
        description: t("contracts.success.closeContract.description"),
      });
      view.onSuccess();
    } catch (error) {
      toast.error(t("contracts.errors.closeContract.title"), {
        description: t("contracts.errors.closeContract.description"),
      });
    }
  };

  const extendContract = async ({
    request,
  }: {
    request: ExtendContractRequestModel;
  }) => {
    try {
      await contractHttpRepository.ExtendContract({
        guid: request.guid,
        newEndDate: request.newEndDate,
      });
      toast.success(t("contracts.success.extendContract.title"), {
        description: t("contracts.success.extendContract.description"),
      });
    } catch (error) {
      toast.error(t("contracts.errors.extendContract.title"), {
        description: t("contracts.errors.extendContract.description"),
      });
    }
  };

  const getContractDetails = async ({
    request,
    view,
  }: {
    request: GetContractDetailsRequestModel;
    view: GetContractDetailsView;
  }) => {
    view.setLoading(true);
    try {
      const response = await contractHttpRepository.GetContractDetails(request);
      view.setContractDetails(response);
    } catch (error) {
      toast.error(t("contracts.errors.listFetch.title"), {
        description: t("contracts.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const downloadCandidateCv = async ({
    request,
    view,
  }: {
    request: GetCvFileRequestModel;
    view: LoadingView;
  }) => {
    try {
      view.setLoading(true);
      const response = await contractHttpRepository.GetCandidateCV({ request });
      downloadFile(response.fileName, response.fileContent);
    } catch (error) {
      toast.error(t("requests.errors.downloadFile.title"), {
        description: t("requests.errors.downloadFile.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    saveContract,
    getList,
    closeContract,
    extendContract,
    getContractDetails,
    downloadCandidateCv,
  };
};
