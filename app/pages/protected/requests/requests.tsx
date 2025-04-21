import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/requests";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Requests" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function Requests() {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>Requests</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>{t("common.welcome")}</h1>
        <Link to="/">Go to login</Link>
      </div>
    </>
  );
}
