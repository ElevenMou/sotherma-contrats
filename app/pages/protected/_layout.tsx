import { Outlet, useNavigation } from "react-router";
import type { Route } from "./+types/_layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/lib/http/http.service";
import Loading from "@/components/layout/Loading";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { userHttpRepository } from "@/data/users/user.repository";
import { RequestsProvider } from "./requests/contexts/RequestsProvider";
import { SitesProvider } from "./admin/sites/contexts/SitesProvider";
import { DepartmentsProvider } from "./admin/departments/contexts/DepartmentsProvider";
import { notificationHttpRepository } from "@/data/notifications/notifications.repository";

export async function clientLoader({}: Route.LoaderArgs) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (!accessToken) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const userInfo = await userHttpRepository.GetCurrentUserInfo();
    const numberOfUnreadNotifications =
      await notificationHttpRepository.GetNumberOfUnreadNotifications();
    return { userInfo, numberOfUnreadNotifications };
  } catch (error) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  );
}

const ProtecedLayout = ({ loaderData }: Route.ComponentProps) => {
  const { setUserInfo, setNumberOfUnreadNotifications } = useGlobalContext();
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  useEffect(() => {
    if (!loaderData) return;
    setUserInfo(loaderData.userInfo);
    setNumberOfUnreadNotifications(loaderData.numberOfUnreadNotifications);
  }, [isNavigating]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SitesProvider>
          <DepartmentsProvider>
            <RequestsProvider>
              {isNavigating && (
                <div className="flex items-center justify-center h-svh">
                  <Loading />
                </div>
              )}
              {!isNavigating && <Outlet />}
            </RequestsProvider>
          </DepartmentsProvider>
        </SitesProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtecedLayout;
