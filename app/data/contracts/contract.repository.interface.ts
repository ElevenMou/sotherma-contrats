import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { GetContractDetailsRequestModel } from "./model/request/GetContractDetailsRequestModel";
import type { GetCvFileRequestModel } from "./model/request/GetCvFileRequestModel";
import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";
import type { ContractListItemModel } from "./model/response/ContractListItemModel";
import type { GetCvFileResponseModel } from "./model/response/GetCvFileResponseModel";

export interface IContractRepository {
  GetList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<ContractListItemModel, "contractList">>;

  SaveContract: (contract: ContractDetailsModel) => Promise<void>;

  CloseContract: (guid: string) => Promise<void>;

  ExtendContract: (guid: string, newEndDate: string) => Promise<void>;

  GetContractDetails: (
    request: GetContractDetailsRequestModel
  ) => Promise<ContractDetailsModel>;

  GetCandidateCV: ({
    request,
  }: {
    request: GetCvFileRequestModel;
  }) => Promise<GetCvFileResponseModel>;
}
