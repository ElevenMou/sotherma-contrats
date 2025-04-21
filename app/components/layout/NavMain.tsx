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

export function NavMain() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const items = [
    {
      title: t("menu.requests"),
      url: "/requests",
      icon: LayoutDashboard,
      isActive: true,
      roles: ["user", "admin"],
    },
    {
      title: t("menu.employees"),
      url: "/employees",
      icon: Users,
      roles: ["user", "admin"],
    },
    {
      title: t("menu.contracts"),
      url: "/contracts",
      icon: ReceiptText,
      roles: ["user", "admin"],
    },
    {
      title: t("menu.departments"),
      url: "/departments",
      icon: Building2,
      roles: ["user", "admin"],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname.includes(item.url)}>
              <NavLink to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
