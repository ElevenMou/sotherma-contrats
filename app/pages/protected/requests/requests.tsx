import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/requests";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import MyRequestsList from "./components/MyRequestsList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ManagerRequests from "./components/ManagerRequests";
import RequesterRequests from "./components/RequesterRequests";
import HRRequests from "./components/HRRequests";

export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: "Sotherma Contracts" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function Requests() {
  const { t } = useTranslation();
  const { userInfo } = useGlobalContext();

  const isAdmin = userInfo?.profile === userRoles.admin;
  const isRequester = userInfo?.profile === userRoles.requester;
  const isManager = userInfo?.profile === userRoles.manager;
  const isHR =
    userInfo?.profile === userRoles.hr ||
    userInfo?.profile === userRoles.hr_delegate;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 w-full">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1 className="w-full">{t("menu.requests")}</h1>
          {(isRequester || isManager || isHR) && (
            <Button asChild className="!w-fit">
              <Link to="/requests/create" className="w-full">
                {t("requests.add_request")}
              </Link>
            </Button>
          )}
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {isManager && <ManagerRequests />}

        {isRequester && <RequesterRequests />}

        {isHR && <HRRequests />}

        {isAdmin && <MyRequestsList />}
      </div>
    </>
  );
}
