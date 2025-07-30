import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/sites";
import SitesList from "./components/SitesList";
import SiteFormDialog from "./components/SiteFormDialog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sotherma Contracts" },
    { name: "description", content: "Welcome to sites!" },
  ];
}

export default function Sites() {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1 className="w-full">{t("menu.sites")}</h1>
          <SiteFormDialog />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <SitesList />
      </div>
    </>
  );
}
