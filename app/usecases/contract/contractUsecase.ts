import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { contractHttpRepository } from "@/data/contracts/contract.repository";
import type {
  ContractUseCaseInterface,
  GetListView,
  LoadingView,
  SaveContractView,
} from "./contractUsecase.interface";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { ExtendContractRequestModel } from "@/data/contracts/model/request/ExtendContractRequestModel";

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
      console.log(response);

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
    guid,
    view,
  }: {
    guid: string;
    view: LoadingView;
  }) => {
    try {
      view.setLoading(true);
      await contractHttpRepository.CloseContract(guid);
      toast.success(t("contracts.success.closeContract.title"), {
        description: t("contracts.success.closeContract.description"),
      });
    } catch (error) {
      toast.error(t("contracts.errors.closeContract.title"), {
        description: t("contracts.errors.closeContract.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const extendContract = async ({
    request,
  }: {
    request: ExtendContractRequestModel;
  }) => {
    try {
      await contractHttpRepository.ExtendContract(
        request.guid,
        request.newEndDate
      );
      toast.success(t("contracts.success.extendContract.title"), {
        description: t("contracts.success.extendContract.description"),
      });
    } catch (error) {
      toast.error(t("contracts.errors.extendContract.title"), {
        description: t("contracts.errors.extendContract.description"),
      });
    }
  };

  return {
    saveContract,
    getList,
    closeContract,
    extendContract,
  };
};
