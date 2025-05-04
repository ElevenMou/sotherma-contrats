"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/layout/Logo";
import { NavMain } from "./NavMain";
import ThemeChanger from "./ThemeChanger";
import { NavUser } from "./NavUser";
import DelegationChanger from "./DelegationChanger";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { NotificationsDrawer } from "./NotificationsDrawer";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userInfo } = useGlobalContext();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo className="w-full" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <NotificationsDrawer />
            <ThemeChanger />
          </div>
          {userInfo?.profile === userRoles.hr && <DelegationChanger />}
        </div>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
