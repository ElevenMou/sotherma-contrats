import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/employees";
import EmployeesList from "./components/EmployeesList";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { EmployeesProvider } from "./contexts/EmployeesProvider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employees" },
    { name: "description", content: "Welcome to employees!" },
  ];
}

export default function Employees() {
  const { t } = useTranslation();
  return (
    <EmployeesProvider>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1 className="w-full">{t("employees.title")}</h1>
          <Button asChild className="!w-fit">
            <Link to="/employees/create" className="w-full">
              {t("employees.add_employee")}
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EmployeesList />
      </div>
    </EmployeesProvider>
  );
}
