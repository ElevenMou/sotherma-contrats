"use client";

import { Building2, LayoutDashboard, ReceiptText, Users } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router";
import { useGlobalContext } from "@/contexts/GlobalContext";
import {
  userRoles,
  type UserRole,
} from "@/data/auth/model/response/UserInfoResponseModel";
import { useEffect } from "react";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
  roles: UserRole[];
}

export function NavMain() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { userInfo } = useGlobalContext();

  const items: NavItem[] = [
    {
      title: t("menu.requests"),
      url: "/requests",
      icon: LayoutDashboard,
      isActive: true,
      roles: [
        userRoles.admin,
        userRoles.hr,
        userRoles.manager,
        userRoles.requester,
      ],
    },
    {
      title: t("menu.contracts"),
      url: "/contracts",
      icon: ReceiptText,
      roles: [
        userRoles.admin,
        userRoles.hr,
        userRoles.manager,
        userRoles.requester,
      ],
    },
    {
      title: t("menu.employees"),
      url: "/employees",
      icon: Users,
      roles: [userRoles.admin],
    },
    {
      title: t("menu.departments"),
      url: "/departments",
      icon: Building2,
      roles: [userRoles.admin],
    },
  ];

  return (
    userInfo && (
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) =>  (
              item.roles.includes(userInfo.profile) && (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url)}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )
          )}
        </SidebarMenu>
      </SidebarGroup>
    )
  );
}
