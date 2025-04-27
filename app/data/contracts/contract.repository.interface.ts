import type { ContractDetailsModel } from "./model/response/ContractDetailsModel";

export interface IContractRepository {
  SaveContract: (contract: ContractDetailsModel) => Promise<void>;
}
