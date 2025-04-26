import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetUserDetailsView,
  GetUsersListView,
  UserUseCaseInterface,
} from "./userUsecase.interface";
import type { GetUsersListRequestModel } from "@/data/users/model/request/GetUsersListRequestModel";
import { userHttpRepository } from "@/data/users/user.repository";
import { useEmployeesContext } from "@/pages/protected/admin/employees/contexts/EmployeesProvider";
import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";

export const useUserUsecase = (): UserUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useEmployeesContext();

  const getUsersList = async ({
    request,
    view,
  }: {
    request: GetUsersListRequestModel;
    view: GetUsersListView;
  }) => {
    try {
      view.setLoading(true);
      const res = await userHttpRepository.GetUsersList(request);
      if (res) {
        ctx.setEmployees(res.usersList);
        ctx.setTotalCount(res.totalCount);
      } else {
        toast.error(t("employees.errors.listFetch.title"), {
          description: t("employees.errors.listFetch.description"),
        });
      }
    } catch (error) {
      toast.error(t("employees.errors.listFetch.title"), {
        description: t("employees.errors.listFetch.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const getUserDetails = async ({
    request,
    view,
  }: {
    request: GetUserDetailsRequestModel;
    view: GetUserDetailsView;
  }) => {
    try {
      view.setLoading(true);
      const res = await userHttpRepository.GetUserDetails(request);
      if (res) {
        view.setUserDetails(res);
      } else {
        toast.error(t("employees.errors.userDetails.title"), {
          description: t("employees.errors.userDetails.description"),
        });
      }
    } catch (error) {
      view.onError();
      toast.error(t("employees.errors.userDetails.title"), {
        description: t("employees.errors.userDetails.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const saveUserDetails = async ({
    request,
  }: {
    request: UserDetailsModel;
  }) => {
    try {
      const res = await userHttpRepository.SaveUserDetails(request);
      if (res) {
        toast.success(t("employees.success.saveUser.title"), {
          description: t("employees.success.saveUser.description"),
        });
      } else {
        toast.error(t("employees.errors.saveUser.title"), {
          description: t("employees.errors.saveUser.description"),
        });
      }
    } catch (error) {
      toast.error(t("employees.errors.saveUser.title"), {
        description: t("employees.errors.saveUser.description"),
      });
    }
  };

  return { getUsersList, getUserDetails, saveUserDetails };
};
