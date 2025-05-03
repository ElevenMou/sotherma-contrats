import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/departments";
import DepartmentsList from "./components/DepartmentsList";
import DepartmentFormDialog from "./components/DepartmentFormDialog";
import { DepartmentsProvider } from "./contexts/DepartmentsProvider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Departments" },
    { name: "description", content: "Welcome to departments!" },
  ];
}

export default function Departments() {
  const { t } = useTranslation();

  return (
    <DepartmentsProvider>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1 className="w-full">{t("menu.departments")}</h1>
          <DepartmentFormDialog />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DepartmentsList />
      </div>
    </DepartmentsProvider>
  );
}
