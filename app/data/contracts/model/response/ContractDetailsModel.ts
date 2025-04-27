export interface ContractDetailsModel {
  guid?: string;
  requestGuid: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  providerFirstName: string;
  providerLastName: string;
  providerEmail: string;
  statusLabel?: string;
  cvFile: File;
}
