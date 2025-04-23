import { Outlet, useNavigation } from "react-router";
import type { Route } from "./+types/_layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/lib/http/http.service";
import Loading from "@/components/layout/Loading";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { authHttpRepository } from "@/data/auth/auth.repository";

export async function clientLoader({}: Route.LoaderArgs) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (!accessToken) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const res = await authHttpRepository.GetUserInfo();
    return res;
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
  const { setUserInfo } = useGlobalContext();
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  useEffect(() => {
    if (!loaderData) return;
    console.log("loaderData", loaderData);

    setUserInfo(loaderData);
  }, [isNavigating]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {isNavigating && (
          <div className="flex items-center justify-center h-svh">
            <Loading />
          </div>
        )}
        {!isNavigating && <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtecedLayout;
