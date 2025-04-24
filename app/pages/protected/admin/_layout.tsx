import { Outlet, useNavigation } from "react-router";
import Loading from "@/components/layout/Loading";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { EmployeesProvider } from "./employees/contexts/EmployeesProvider";

const ProtecedAdminLayout = () => {
  const { userInfo } = useGlobalContext();
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-svh">
        <Loading />
      </div>
    );
  }

  if (userInfo && userInfo.profile !== userRoles.admin) {
    return (
      <div className="flex flex-col items-center justify-center h-svh gap-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <>
      {isNavigating && (
        <div className="flex items-center justify-center h-svh">
          <Loading />
        </div>
      )}
      {!isNavigating && (
        <EmployeesProvider>
          <Outlet />
        </EmployeesProvider>
      )}
    </>
  );
};

export default ProtecedAdminLayout;
