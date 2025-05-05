import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { useDepartmentManagementContext } from "@/pages/protected/admin/departments-management/contexts/DepartmentManagementProvider";
import type {
  DepartmentManagementUseCaseInterface,
  SaveDepartmentManagementView,
} from "./departmentManagementUsecase.interface";
import { departmentManagementHttpRepository } from "@/data/department-management/departmentManagement.repository";
import type { DepartmentManagementDetailsModel } from "@/data/department-management/model/request/DepartmentManagementDetailsModel";

export const useDepartmentManagementUseCase =
  (): DepartmentManagementUseCaseInterface => {
    const { t } = useTranslation();
    const ctx = useDepartmentManagementContext();

    const saveDepartmentManagementDetails = async ({
      request,
      view,
    }: {
      request: DepartmentManagementDetailsModel;
      view: SaveDepartmentManagementView;
    }) => {
      try {
        await departmentManagementHttpRepository.SaveDepartmentManagementDetails(
          request
        );
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

    const getDepartmentManagementDetails = async (
      departmentGuid: string
    ): Promise<void> => {
      ctx.setLoading(true);
      try {
        const response =
          await departmentManagementHttpRepository.GetDepartmentManagementDetails(
            departmentGuid
          );
        ctx.setDepartmentManagement(response);
      } catch (error) {
        toast.error(t("departments.errors.detailsFetch.title"), {
          description: t("departments.errors.detailsFetch.description"),
        });
      } finally {
        ctx.setLoading(false);
      }
    };

    const getDepartmentManagementUsersList = async (): Promise<void> => {
      try {
        const response =
          await departmentManagementHttpRepository.GetDepartmentManagementUsersList();
        ctx.setUsersList(response);
      } catch (error) {
        toast.error(t("departments.errors.usersFetch.title"), {
          description: t("departments.errors.usersFetch.description"),
        });
      }
    };

    return {
      saveDepartmentManagementDetails,
      getDepartmentManagementDetails,
      getDepartmentManagementUsersList,
    };
  };
