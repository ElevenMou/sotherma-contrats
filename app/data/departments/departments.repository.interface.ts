import type { DepartmentModel } from "./model/response/DepartmentModel";

export interface IDepartmentRepository {
  GetAllDepartments(): Promise<DepartmentModel[]>;
}
