import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";

export interface IContractRepository {
  GetList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<ContractDetailsModel, "contractList">>;

  SaveContract: (contract: ContractDetailsModel) => Promise<void>;
}
