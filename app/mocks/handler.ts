import { DepartmentRepositoryMock } from "@/data/departments/departments.repository.mock";
import { UserRepositoryMock } from "@/data/users/user.repository.mock";
import { AuthRepositoryMock } from "@data/auth/auth.repository.mock";

export const handlers = [
  ...AuthRepositoryMock,
  ...UserRepositoryMock,
  ...DepartmentRepositoryMock,
];
