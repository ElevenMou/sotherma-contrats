import HttpService from "@/lib/http/http.service";
import { generateUrl, getEnvironment } from "../environment";
import type { IDepartmentRepository } from "./departments.repository.interface";
import type { DepartmentSlectItemModel } from "./model/response/DepartmentSlectItemModel";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { DepartmentListItemModel } from "./model/response/DepartmentListItemModel";
import type { DepartmentDetailsModel } from "./model/request/DepartmentDetailsModel";
import type { GetDepartmentDetailsRequestModel } from "./model/request/GetDepartmentDetailsRequestModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { DepartmentsAPI } = getEnvironment();
const { base, endpoints } = DepartmentsAPI;

class DepartmentHttpRepository implements IDepartmentRepository {
  async GetAllDepartments(): Promise<DepartmentSlectItemModel[]> {
    const url = `${base}${endpoints.departmentsList}`;
    try {
      const response = await httpService.get<DepartmentSlectItemModel[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetDepartmentsList(
    request: ListPaginationRequestModel
  ): Promise<ListResponseModel<DepartmentListItemModel, "departmentsList">> {
    const url = generateUrl(`${base}${endpoints.getList}`, {
      startIndex: request.startIndex.toString(),
      maxRecords: request.maxRecords.toString(),
    });
    try {
      const response = await httpService.get<
        ListResponseModel<DepartmentListItemModel, "departmentsList">
      >(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async SaveDepartment(request: DepartmentDetailsModel): Promise<void> {
    const url = `${base}${endpoints.save}`;
    try {
      await httpService.post(url, request);
    } catch (error) {
      throw error;
    }
  }

  async GetDepartmentDetails(
    request: GetDepartmentDetailsRequestModel
  ): Promise<DepartmentDetailsModel> {
    const url = generateUrl(`${base}${endpoints.details}`, {
      guid: request.guid,
    });
    try {
      const response = await httpService.get<DepartmentDetailsModel>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const departmentHttpRepository = new DepartmentHttpRepository();
