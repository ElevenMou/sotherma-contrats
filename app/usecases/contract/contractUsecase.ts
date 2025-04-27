import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { contractHttpRepository } from "@/data/contracts/contract.repository";
import type {
  ContractUseCaseInterface,
  GetListView,
  SaveContractView,
} from "./contractUsecase.interface";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export const useContractUsecase = (): ContractUseCaseInterface => {
  const { t } = useTranslation();
  // const ctx = useContractsContext();

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
      console.log(error);

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
      console.log(error);
      toast.error(t("contracts.errors.getList.title"), {
        description: t("contracts.errors.getList.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    saveContract,
    getList,
  };
};
