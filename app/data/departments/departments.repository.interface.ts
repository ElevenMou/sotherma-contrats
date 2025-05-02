import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { DepartmentDetailsModel } from "./model/response/DepartmentDetailsModel";
import type { DepartmentListItemModel } from "./model/response/DepartmentListItemModel";

export interface IDepartmentRepository {
  GetAllDepartments(): Promise<DepartmentDetailsModel[]>;
  GetDepartmentsList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<DepartmentListItemModel, "departmentsList">>;
}
