import { departmentHttpRepository } from "@/data/departments/departments.repository";
import type {
  DepartmentUseCaseInterface,
  GetAllDepartmentsView,
  GetDepartmentDetailsView,
  SaveDepartmentView,
} from "./departmentUsecase.interface";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import type { DepartmentDetailsModel } from "@/data/departments/model/request/DepartmentDetailsModel";
import type { GetDepartmentDetailsRequestModel } from "@/data/departments/model/request/GetDepartmentDetailsRequestModel";
import {
  DEPARTMENTS_MAX_RECORDS,
  useDepartmentsContext,
} from "@/pages/protected/admin/departments/contexts/DepartmentsProvider";

export const useDepartmentUseCase = (): DepartmentUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useDepartmentsContext();

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
  }: {
    request: ListPaginationRequestModel;
  }) => {
    ctx.setLoading(true);
    try {
      const response = await departmentHttpRepository.GetDepartmentsList(
        request
      );
      ctx.setDepartments(response.departmentsList);
      ctx.setTotalCount(response.totalCount);
    } catch (error) {
      toast.error(t("departments.errors.listFetch.title"), {
        description: t("departments.errors.listFetch.description"),
      });
    } finally {
      ctx.setLoading(false);
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
      ctx.setStartIndex(0);
      await getDepartmentsList({
        request: {
          startIndex: 0,
          maxRecords: DEPARTMENTS_MAX_RECORDS,
        },
      });
    } catch (error) {
      toast.error(t("departments.errors.saveDepartment.title"), {
        description: t("departments.errors.saveDepartment.description"),
      });
    }
  };

  const getDepartmentDetails = async ({
    request,
    view,
  }: {
    request: GetDepartmentDetailsRequestModel;
    view: GetDepartmentDetailsView;
  }) => {
    view.setLoading(true);
    try {
      const response = await departmentHttpRepository.GetDepartmentDetails(
        request
      );
      view.setDepartmentDetails(response);
    } catch (error) {
      toast.error(t("departments.errors.detailsFetch.title"), {
        description: t("departments.errors.detailsFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    getAllDepartments,
    getDepartmentsList,
    saveDepartment,
    getDepartmentDetails,
  };
};
