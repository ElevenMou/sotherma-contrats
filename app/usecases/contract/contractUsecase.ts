import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { contractHttpRepository } from "@/data/contracts/contract.repository";
import type {
  ContractUseCaseInterface,
  SaveContractView,
} from "./contractUsecase.interface";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";

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

  return {
    saveContract,
  };
};
