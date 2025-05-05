import type { DepartmentManagementDetailsModel } from "@/data/department-management/model/request/DepartmentManagementDetailsModel";

export interface SaveDepartmentManagementView {
  onSuccess: () => void;
}

export interface DepartmentManagementUseCaseInterface {
  saveDepartmentManagementDetails: ({
    request,
    view,
  }: {
    request: DepartmentManagementDetailsModel;
    view: SaveDepartmentManagementView;
  }) => Promise<void>;

  getDepartmentManagementDetails: (departmentGuid: string) => Promise<void>;

  getDepartmentManagementUsersList: () => Promise<void>;
}
