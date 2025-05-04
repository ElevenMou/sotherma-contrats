import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import ChangeLanguage from "@/lib/localization/components/ChangeLanguage";
import { useAuthUsecase } from "@/usecases/auth/authUsecase";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "@/contexts/GlobalContext";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { logout } = useAuthUsecase();
  const { t } = useTranslation();
  const { userInfo } = useGlobalContext();

  return (
    userInfo && (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={undefined} alt={"User Avatar"} />
                  <AvatarFallback className="rounded-lg">
                    {`${userInfo.firstName[0]}${userInfo.lastName[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                  <span className="truncate text-xs">{userInfo.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel
                className="p-0 font-normal cursor-pointer"
                // onClick={() => {
                //   navigate("/profile");
                // }}
              >
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={undefined} alt={"User Avatar"} />
                    <AvatarFallback className="rounded-lg">
                      {`${userInfo.firstName[0]}${userInfo.lastName[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {`${userInfo.firstName} ${userInfo.lastName}`}
                    </span>
                    <span className="truncate text-xs">{userInfo.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <ChangeLanguage />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="items-start h-full w-full cursor-pointer px-2 py-1.5 "
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  {t("menu.logout")}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  );
}
