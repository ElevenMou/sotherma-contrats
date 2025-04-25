import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/employee-details";
import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { GetUserDetailsResponseModel } from "@/data/users/model/response/GetUserDetailsResponseModel";
import { useUserUsecase } from "@/usecases/user/userUsecase";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/layout/Loading";
import EmployeeForm from "./components/EmployeeForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employee details" },
    { name: "description", content: "Welcome to employees!" },
  ];
}

export default function EmployeeDetails({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const { getUserDetails } = useUserUsecase();

  const [employeeDetails, setEmployeeDetails] =
    useState<GetUserDetailsResponseModel | null>(null);

  const handleFetchError = () => {
    setLoading(false);
    setEmployeeDetails(null);
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      await getUserDetails({
        request: { guid: params.id },
        view: {
          setLoading,
          setUserDetails: setEmployeeDetails,
          onError: handleFetchError,
        },
      });
    };

    if (params.id !== "create") {
      fetchEmployeeDetails();
    } else {
      setEmployeeDetails(null);
      setLoading(false);
    }
  }, [params.id]);
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Button asChild variant="ghost" size="icon" title={t("common.back")}>
            <Link to={routes.employees}>
              <ArrowLeftCircle className="size-5" />
            </Link>
          </Button>
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>
            {params.id === "create" ? (
              t("employees.add_employee")
            ) : loading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              `${employeeDetails?.firstName} ${employeeDetails?.lastName}`
            )}
          </h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {loading && (
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        )}

        {!loading && <EmployeeForm employeeDetails={employeeDetails} />}
      </div>
    </>
  );
}
