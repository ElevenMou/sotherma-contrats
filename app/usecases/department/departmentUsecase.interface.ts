import type { DepartmentModel } from "@/data/departments/model/response/DepartmentModel";

export interface GetAllDepartmentsView {
  setDepartments: (departments: DepartmentModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface DepartmentUseCaseInterface {
  getAllDepartments: ({
    view,
  }: {
    view: GetAllDepartmentsView;
  }) => Promise<void>;
}
