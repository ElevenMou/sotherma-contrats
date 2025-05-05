import type { DepartmentManagementDetailsModel } from "./model/request/DepartmentManagementDetailsModel";
import type { GetDepartmentManagementUsersListModel } from "./model/response/GetDepartmentManagementUsersListModel";

export interface IDepartmentManagementRepository {
  SaveDepartmentManagementDetails: (
    departmentManagementDetails: DepartmentManagementDetailsModel
  ) => Promise<void>;

  GetDepartmentManagementDetails: (
    departmentGuid: string
  ) => Promise<DepartmentManagementDetailsModel>;

  GetDepartmentManagementUsersList: () => Promise<GetDepartmentManagementUsersListModel>;
}
