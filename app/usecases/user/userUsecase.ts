import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type {
  GetDelegationUsersView,
  GetUserDetailsView,
  SaveUserDetailsView,
  SetIsDelegetedView,
  UserAdminUseCaseInterface,
  UserPublicUseCaseInterface,
} from "./userUsecase.interface";
import type { ListPaginationRequestModel } from "@/data/utils/ListPaginationRequestModel";
import { userHttpRepository } from "@/data/users/user.repository";
import { useEmployeesContext } from "@/pages/protected/admin/employees/contexts/EmployeesProvider";
import type { GetUserDetailsRequestModel } from "@/data/users/model/request/GetUserDetailsRequestModel";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import type { SetIsDelegetedRequestModel } from "@/data/users/model/request/SetIsDelegetedRequestModel";
import { useGlobalContext } from "@/contexts/GlobalContext";
import type { SetActiveStatusRequestModel } from "@/data/users/model/request/SetActiveStatusRequestModel";

export const useUserAdminUsecase = (): UserAdminUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useEmployeesContext();

  const getUsersList = async ({
    request,
  }: {
    request: ListPaginationRequestModel;
  }) => {
    try {
      ctx.setLoading(true);
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
      ctx.setLoading(false);
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
    view,
  }: {
    request: UserDetailsModel;
    view: SaveUserDetailsView;
  }) => {
    try {
      await userHttpRepository.SaveUserDetails(request);
      toast.success(t("employees.success.saveUser.title"), {
        description: t("employees.success.saveUser.description"),
      });
      view.onSuccess();
    } catch (error) {
      toast.error(t("employees.errors.saveUser.title"), {
        description: t("employees.errors.saveUser.description"),
      });
    }
  };

  const getDelegationUsers = async ({
    view,
  }: {
    view: GetDelegationUsersView;
  }) => {
    try {
      const res = await userHttpRepository.GetDelegationUsers();
      if (res) {
        view.setDelegationUsers(res);
      } else {
        toast.error(t("employees.errors.setDelegation.title"), {
          description: t("employees.errors.setDelegation.description"),
        });
      }
    } catch (error) {
      toast.error(t("employees.errors.setDelegation.title"), {
        description: t("employees.errors.setDelegation.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  const setActiveStatus = async ({
    request,
    view,
  }: {
    request: SetActiveStatusRequestModel;
    view: SetIsDelegetedView;
  }) => {
    try {
      view.setLoading(true);
      await userHttpRepository.SetActiveStatus(request);
    } catch (error) {
      toast.error(t("employees.errors.setStatus.title"), {
        description: t("employees.errors.setStatus.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    getUsersList,
    getUserDetails,
    saveUserDetails,
    getDelegationUsers,
    setActiveStatus,
  };
};

export const useUserPublicUsecase = (): UserPublicUseCaseInterface => {
  const { t } = useTranslation();
  const ctx = useGlobalContext();

  const setIsDelegated = async ({
    request,
    view,
  }: {
    request: SetIsDelegetedRequestModel;
    view: SetIsDelegetedView;
  }) => {
    try {
      view.setLoading(true);
      await userHttpRepository.SetIsDelegated(request);
      const res = await userHttpRepository.GetCurrentUserInfo();
      ctx.setUserInfo(res);
    } catch (error) {
      toast.error(t("employees.errors.setDelegated.title"), {
        description: t("employees.errors.setDelegated.description"),
      });
    } finally {
      view.setLoading(false);
    }
  };

  return {
    setIsDelegated,
  };
};
