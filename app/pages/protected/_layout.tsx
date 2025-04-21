import { Outlet } from "react-router";
import type { Route } from "./+types/_layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";

export async function clientLoader({}: Route.LoaderArgs) {
  // Simulate a protected route check
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
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
