import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { Route } from "./+types/departments-management";
import { useDepartmentManagementUseCase } from "@/usecases/department-management/departmentManagementUsecase";
import { useEffect } from "react";
import { useDepartmentManagementContext } from "./contexts/DepartmentManagementProvider";
import Loading from "@/components/layout/Loading";
import DepartmentManagementForm from "./components/DepartmentManagementForm";
import { Skeleton } from "@/components/ui/skeleton";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Department management" }];
}

export default function EmployeeDetails({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { id } = params;

  const { getDepartmentManagementDetails, getDepartmentManagementUsersList } =
    useDepartmentManagementUseCase();

  const { loading, departmentManagement } = useDepartmentManagementContext();

  useEffect(() => {
    getDepartmentManagementDetails(id);
    getDepartmentManagementUsersList();
  }, [id]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Button asChild variant="ghost" size="icon" title={t("common.back")}>
            <Link to={routes.departments}>
              <ArrowLeftCircle className="size-5" />
            </Link>
          </Button>
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>
            {loading ? (
              <Skeleton className="h-8 w-40" />
            ) : departmentManagement ? (
              departmentManagement?.departmentName
            ) : (
              t("departments.edit_department")
            )}
          </h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {loading && (
          <div className="flex items-center justify-center h-svh">
            <Loading />
          </div>
        )}

        {!loading && <DepartmentManagementForm />}
      </div>
    </>
  );
}
