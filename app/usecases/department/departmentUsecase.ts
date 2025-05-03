import { departmentHttpRepository } from "@/data/departments/departments.repository";
import type {
  DepartmentUseCaseInterface,
  GetAllDepartmentsView,
  GetDepartmentsListView,
  SaveDepartmentView,
} from "./departmentUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { DepartmentDetailsModel } from "@/data/departments/model/request/DepartmentDetailsModel";

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
      toast.error(t("departments.errors.listFetch.title"), {
        description: t("departments.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const getDepartmentsList = async ({
    request,
    view,
  }: {
    request: ListPaginationRequestModel;
    view: GetDepartmentsListView;
  }) => {
    view.setLoading(true);
    try {
      const response = await departmentHttpRepository.GetDepartmentsList(
        request
      );
      view.setDepartments(response.departmentsList);
      view.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("departments.errors.listFetch.title"), {
        description: t("departments.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const saveDepartment = async ({
    request,
    view,
  }: {
    request: DepartmentDetailsModel;
    view: SaveDepartmentView;
  }) => {
    try {
      await departmentHttpRepository.SaveDepartment(request);
      toast.success(t("departments.success.saveDepartment.title"), {
        description: t("departments.success.saveDepartment.description"),
      });
      view.onSuccess();
    } catch (error) {
      toast.error(t("departments.errors.saveDepartment.title"), {
        description: t("departments.errors.saveDepartment.description"),
      });
    }
  };

  return { getAllDepartments, getDepartmentsList, saveDepartment };
};
