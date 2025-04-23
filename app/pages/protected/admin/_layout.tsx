import { Outlet, useNavigation } from "react-router";
import Loading from "@/components/layout/Loading";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";

const ProtecedAdminLayout = () => {
  const { userInfo } = useGlobalContext();
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  useEffect(() => {
    if (userInfo?.profile !== userRoles.admin) {
      throw new Response("Unauthorized", { status: 401 });
    }
  }, [userInfo]);

  if (!userInfo || userInfo?.profile !== userRoles.admin) {
    return (
      <div className="flex items-center justify-center h-svh">
        <Loading />
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
      {!isNavigating && <Outlet />}
    </>
  );
};

export default ProtecedAdminLayout;
