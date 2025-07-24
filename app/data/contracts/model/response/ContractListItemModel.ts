export interface ContractListItemModel {
  guid?: string;
  startDate: Date;
  endDate: Date;
  contractedFirstName: string;
  contractedLastName: string;
  contractedPhone: string;
  statusLabel?: string;
  extendable: boolean;
}
