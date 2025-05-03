import type { EnumToType } from "@/lib/utils";

export interface CurrentUserInfoModel {
  firstName: string;
  lastName: string;
  email: string;
  profile: UserRole;
  delegated: boolean;
}

export const userRoles = {
  admin: "admin",
  manager: "manager",
  hr: "hr",
  requester: "requester",
  hr_deleagate: "hr_deleagate",
};

export type UserRole = EnumToType<keyof typeof userRoles>;
