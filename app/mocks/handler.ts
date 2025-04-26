import { DepartmentRepositoryMock } from "@/data/departments/departments.repository.mock";
import { RequestRepositoryMock } from "@/data/requests/request.repository.mock";
import { SiteRepositoryMock } from "@/data/sites/sites.repository.mock";
import { UserRepositoryMock } from "@/data/users/user.repository.mock";
import { AuthRepositoryMock } from "@data/auth/auth.repository.mock";

export const handlers = [
  ...AuthRepositoryMock,
  ...UserRepositoryMock,
  ...DepartmentRepositoryMock,
  ...SiteRepositoryMock,
  ...RequestRepositoryMock,
];
