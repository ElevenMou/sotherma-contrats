import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetUsersListView,
  UserUseCaseInterface,
} from "./userUsecase.interface";
import type { GetUsersListRequestModel } from "@/data/users/model/request/GetUsersListRequestModel";
import { userHttpRepository } from "@/data/users/user.repository";
import { useEmployeesContext } from "@/pages/protected/admin/employees/contexts/EmployeesProvider";

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
        toast.error(t("login.errors.loginFailed"), {
          description: t("login.errors.invalidCredentials"),
        });
      }
    } catch (error) {
      toast.error(t("login.errors.loginFailed"), {
        description: t("login.errors.errorOccured"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return { getUsersList };
};
