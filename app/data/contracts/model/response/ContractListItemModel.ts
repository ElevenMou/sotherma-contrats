export interface ContractListItemModel {
  guid?: string;
  startDate: Date;
  endDate: Date;
  contractedFirstName: string;
  contractedLastName: string;
  contractedEmail: string;
  statusLabel?: string;
  extendable: boolean;
}
