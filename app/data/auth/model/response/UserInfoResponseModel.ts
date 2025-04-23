import type { EnumToType } from "@/lib/utils";

export interface UserInfoModel {
  name: string;
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
