import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { DepartmentSlectItemModel } from "./model/response/DepartmentSlectItemModel";
import type { DepartmentListItemModel } from "./model/response/DepartmentListItemModel";

export interface IDepartmentRepository {
  GetAllDepartments(): Promise<DepartmentSlectItemModel[]>;
  GetDepartmentsList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<DepartmentListItemModel, "departmentsList">>;
}
