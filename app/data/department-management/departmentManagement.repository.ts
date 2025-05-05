import HttpService from "@/lib/http/http.service";
import { generateUrl, getEnvironment } from "../environment";
import type { ListPaginationRequestModel } from "../utils/ListPaginationRequestModel";
import type { ListResponseModel } from "../utils/GetUsersListResponseModel";
import type { IDepartmentManagementRepository } from "./departmentManagement.repository.interface";
import type { DepartmentManagementDetailsModel } from "./model/request/DepartmentManagementDetailsModel";
import type { GetDepartmentManagementUsersListModel } from "./model/response/GetDepartmentManagementUsersListModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { DepartmentManagementAPI } = getEnvironment();
const { base, endpoints } = DepartmentManagementAPI;

class DepartmentManagementHttpRepository
  implements IDepartmentManagementRepository
{
  async SaveDepartmentManagementDetails(
    departmentManagementDetails: DepartmentManagementDetailsModel
  ): Promise<void> {
    try {
      const url = `${base}${endpoints.save}`;
      await httpService.post(url, departmentManagementDetails);
    } catch (error) {
      throw error;
    }
  }

  async GetDepartmentManagementDetails(
    departmentGuid: string
  ): Promise<DepartmentManagementDetailsModel> {
    try {
      const url = generateUrl(`${base}${endpoints.details}`, {
        guid: departmentGuid,
      });
      const response = await httpService.get<DepartmentManagementDetailsModel>(
        url
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetDepartmentManagementUsersList(): Promise<GetDepartmentManagementUsersListModel> {
    try {
      const url = `${base}${endpoints.getUsersList}`;
      const response =
        await httpService.get<GetDepartmentManagementUsersListModel>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const departmentManagementHttpRepository =
  new DepartmentManagementHttpRepository();
