"use client";

import {
  LayoutDashboard,
  MonitorDot,
  ReceiptText,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    roles: ["user", "admin"],
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: ReceiptText,
    roles: ["user", "admin"],
  },
  {
    title: "Processes",
    url: "/processes",
    icon: MonitorDot,
    roles: ["user", "admin"],
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    roles: ["admin"],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
