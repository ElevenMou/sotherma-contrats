export interface ContractDetailsModel {
  guid?: string;
  requestGuid: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  contractedFirstName: string;
  contractedLastName: string;
  contractedPhone: string;
  providerEmail?: string;
  statusLabel?: string;
  cvFile?: File;
}
