export interface ContractDetailsModel {
  guid?: string;
  requestGuid: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  contractedFirstName: string;
  contractedLastName: string;
  contractedEmail: string;
  providerEmail?: string;
  statusLabel?: string;
  cvFile?: File;
}
