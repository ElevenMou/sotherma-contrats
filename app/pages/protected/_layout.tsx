import { Outlet } from "react-router";
import type { Route } from "./+types/_layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/lib/http/http.service";
import Loading from "@/components/layout/Loading";

export async function clientLoader({}: Route.LoaderArgs) {
  // Simulate a protected route check
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const isAuthenticated = accessToken;

  if (!isAuthenticated) {
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

const ProtecedLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtecedLayout;
