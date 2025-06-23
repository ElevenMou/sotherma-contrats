export interface RequestDetailsModel {
  guid?: string;
  endDate: Date;
  startDate: Date;
  site: number;
  department: number;
  desiredProfile: string;
  contractType: string;
  justification: string;

  numberOfProfiles: number;

  departureFirstName?: string;
  departureLastName?: string;
  departurePosition?: string;
  departureReason?: string;

  contractGuid?: string;
  isChangeable?: boolean;

  recommendedProfiles?: RecommendedProfile[];
}

export interface RecommendedProfile {
  guid?: string;
  candidateFirstName: string;
  candidateLastName: string;
  cvFile?: File | null;
  fileName?: string;
}
