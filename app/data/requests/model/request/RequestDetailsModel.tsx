export interface RequestDetailsModel {
  contractType: string;
  endDate: Date;
  startDate: Date;
  guid?: string;
  siteId: number;
  departmentId: number;
  desiredProfile: string;
  desiredStartDate: Date;
  justification: string;
  numberOfProfiles: number;
  isChangeable?: boolean;
  candidateFirstName?: string | null;
  candidateLastName?: string | null;
  cvFile?: File | null;
}
