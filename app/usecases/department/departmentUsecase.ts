import { departmentHttpRepository } from "@/data/departments/departments.repository";
import type {
  DepartmentUseCaseInterface,
  GetAllDepartmentsView,
} from "./departmentUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDepartmentUseCase = (): DepartmentUseCaseInterface => {
  const { t } = useTranslation();

  const getAllDepartments = async ({
    view,
  }: {
    view: GetAllDepartmentsView;
  }) => {
    view.setLoading(true);
    try {
      const response = await departmentHttpRepository.GetAllDepartments();
      view.setDepartments(response);
    } catch (error) {
      toast.error(t("employees.errors.userDetails.title"), {
        description: t("employees.errors.userDetails.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return { getAllDepartments };
};
