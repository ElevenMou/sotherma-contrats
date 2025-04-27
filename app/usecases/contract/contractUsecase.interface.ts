import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";

export interface SaveContractView {
  navigateToContractsList: () => void;
}

export interface ContractUseCaseInterface {
  saveContract: ({
    request,
    view,
  }: {
    request: ContractDetailsModel;
    view: SaveContractView;
  }) => Promise<void>;
}
