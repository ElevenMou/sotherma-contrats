export interface RequestDetailsModel {
  contractType: string;
  endDate: Date;
  startDate: Date;
  guid?: string;
  contractGuid?: string;
  site: number;
  department: number;
  desiredProfile: string;
  justification: string;
  numberOfProfiles: number;
  isChangeable?: boolean;
  candidateFirstName?: string | null;
  candidateLastName?: string | null;
  cvFile?: File | null;
}
