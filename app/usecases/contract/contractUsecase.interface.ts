import type { ExtendContractRequestModel } from "@/data/contracts/model/request/ExtendContractRequestModel";
import type { GetContractDetailsRequestModel } from "@/data/contracts/model/request/GetContractDetailsRequestModel";
import type { GetCvFileRequestModel } from "@/data/contracts/model/request/GetCvFileRequestModel";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import type { ContractListItemModel } from "@/data/contracts/model/response/ContractListItemModel";
import type { GetCvFileResponseModel } from "@/data/contracts/model/response/GetCvFileResponseModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface SaveContractView {
  navigateToContractsList: () => void;
}

export interface GetListView {
  setContractsList: (contracts: ContractListItemModel[]) => void;
  setTotalCount: (totalCount: number) => void;
  setLoading: (loading: boolean) => void;
}

export interface LoadingView {
  setLoading: (loading: boolean) => void;
}

export interface GetContractDetailsView {
  setContractDetails: (contractDetails: ContractDetailsModel) => void;
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

  closeContract: ({
    guid,
    view,
  }: {
    guid: string;
    view: LoadingView;
  }) => Promise<void>;

  extendContract: ({
    request,
  }: {
    request: ExtendContractRequestModel;
  }) => Promise<void>;

  getContractDetails: ({
    request,
    view,
  }: {
    request: GetContractDetailsRequestModel;
    view: GetContractDetailsView;
  }) => Promise<void>;

  downloadCandidateCv: ({
    request,
    view,
  }: {
    request: GetCvFileRequestModel;
    view: LoadingView;
  }) => Promise<void>;
}
