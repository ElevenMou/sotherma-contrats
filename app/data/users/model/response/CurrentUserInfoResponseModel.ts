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
  hr_delegate: "hr_delegate",
};

export type UserRole = EnumToType<keyof typeof userRoles>;
