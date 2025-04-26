import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/requests";
import RequestsList from "./components/RequestsList";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyRequestsList from "./components/MyRequestsList";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>
            {activeTab === "requests"
              ? t("menu.requests")
              : t("requests.title")}
          </h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {(userInfo?.profile !== userRoles.requester &&
          userInfo?.profile !== userRoles.hr) && (
          <Tabs
            defaultValue="account"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="w-full">
              <TabsTrigger value="requests">{t("menu.requests")}</TabsTrigger>
              <TabsTrigger value="myRequests">
                {t("requests.title")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="requests">
              <RequestsList />
            </TabsContent>
            <TabsContent value="myRequests">
              <MyRequestsList />
            </TabsContent>
          </Tabs>
        )}

        {(userInfo?.profile === userRoles.requester ||
          userInfo?.profile === userRoles.hr) && <MyRequestsList />}
      </div>
    </>
  );
}
