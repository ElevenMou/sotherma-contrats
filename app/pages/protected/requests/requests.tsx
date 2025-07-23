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

export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t("menu.requests") },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function Requests() {
  const { t } = useTranslation();
  const { userInfo } = useGlobalContext();

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
          {(userInfo?.profile === userRoles.requester ||
            userInfo?.profile === userRoles.manager) && (
            <Button asChild className="!w-fit">
              <Link to="/requests/create" className="w-full">
                {t("requests.add_request")}
              </Link>
            </Button>
          )}
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {userInfo?.profile === userRoles.manager && <ManagerRequests />}

        {userInfo?.profile === userRoles.requester && <RequesterRequests />}

        {userInfo?.profile !== userRoles.manager &&
          userInfo?.profile !== userRoles.requester && <MyRequestsList />}
      </div>
    </>
  );
}
