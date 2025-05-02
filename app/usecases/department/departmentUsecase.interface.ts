import type { DepartmentListItemModel } from "@/data/departments/model/response/DepartmentListItemModel";
import type { DepartmentSlectItemModel } from "@/data/departments/model/response/DepartmentSlectItemModel";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";

export interface GetAllDepartmentsView {
  setDepartments: (departments: DepartmentSlectItemModel[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface GetDepartmentsListView {
  setDepartments: (departments: DepartmentListItemModel[]) => void;
  setTotalCount: (totalCount: number) => void;
  setLoading: (loading: boolean) => void;
}

export interface DepartmentUseCaseInterface {
  getAllDepartments: ({
    view,
  }: {
    view: GetAllDepartmentsView;
  }) => Promise<void>;

  getDepartmentsList: ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetDepartmentsListView;
  }) => Promise<void>;
}
