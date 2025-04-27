import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface SaveContractView {
  navigateToContractsList: () => void;
}

export interface GetListView {
  setContractsList: (contracts: ContractDetailsModel[]) => void;
  setTotalCount: (totalCount: number) => void;
  setLoading: (loading: boolean) => void;
}

export interface ContractUseCaseInterface {
  saveContract: ({
    request,
    view,
  }: {
    request: ContractDetailsModel;
    view: SaveContractView;
  }) => Promise<void>;

  getList: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetListView;
  }) => Promise<void>;
}
