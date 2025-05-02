import type { DepartmentDetailsModel } from "@/data/departments/model/response/DepartmentDetailsModel";

export interface GetAllDepartmentsView {
  setDepartments: (departments: DepartmentDetailsModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface DepartmentUseCaseInterface {
  getAllDepartments: ({
    view,
  }: {
    view: GetAllDepartmentsView;
  }) => Promise<void>;
}
