import type { EnumToType } from "@/lib/utils";

export interface CurrentUserInfoModel {
  firstName: string;
  lastName: string;
  email: string;
  profile: UserRole;
}

export const userRoles = {
  admin: "admin",
  manager: "manager",
  hr: "hr",
  requester: "requester",
};

export type UserRole = EnumToType<keyof typeof userRoles>;
