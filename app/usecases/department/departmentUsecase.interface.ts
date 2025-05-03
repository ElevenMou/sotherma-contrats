import type { DepartmentDetailsModel } from "@/data/departments/model/request/DepartmentDetailsModel";
import type { GetDepartmentDetailsRequestModel } from "@/data/departments/model/request/GetDepartmentDetailsRequestModel";
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

export interface GetDepartmentDetailsView {
  setDepartmentDetails: (department: DepartmentDetailsModel) => void;
  setLoading: (loading: boolean) => void;
}

export interface SaveDepartmentView {
  onSuccess: () => void;
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

  saveDepartment: ({
    request,
    view,
  }: {
    request: DepartmentDetailsModel;
    view: SaveDepartmentView;
  }) => Promise<void>;

  getDepartmentDetails: ({
    request,
    view,
  }: {
    request: GetDepartmentDetailsRequestModel;
    view: GetDepartmentDetailsView;
  }) => Promise<void>;
}
