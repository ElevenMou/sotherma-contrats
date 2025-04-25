import HttpService from "@/lib/http/http.service";
import { getEnvironment } from "../environment";
import type { IDepartmentRepository } from "./departments.repository.interface";
import type { DepartmentModel } from "./model/response/DepartmentModel";

// HttpService instance
const httpService = HttpService.getInstance();

// Environment variables
const { DepartmentsAPI } = getEnvironment();
const { base, endpoints } = DepartmentsAPI;

class DepartmentHttpRepository implements IDepartmentRepository {
  async GetAllDepartments(): Promise<DepartmentModel[]> {
    const url = `${base}${endpoints.departmentsList}`;
    try {
      const response = await httpService.get<DepartmentModel[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const departmentHttpRepository = new DepartmentHttpRepository();
