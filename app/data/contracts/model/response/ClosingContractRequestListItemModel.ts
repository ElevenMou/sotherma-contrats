export interface ClosingContractRequestListItemModel {
  contractGuid?: string;
  startDate: Date;
  endDate: Date;
  contractedFirstName: string;
  contractedLastName: string;
  contractedPhone: string;
  closingReason: string;
  requesterFullName: string;
}
