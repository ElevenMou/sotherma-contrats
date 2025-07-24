import { Separator } from "@radix-ui/react-separator";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/layout/Loading";
import type { Route } from "./+types/request-edit";
import RequestForm from "./components/RequestForm";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Request edit" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function RequestDetails({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const { requestId } = params;
  const { state } = useLocation();
  const { contractId } = state || {};

  const navigate = useNavigate();

  const [requestDetails, setRequestDetails] = useState<RequestDetailsModel>();

  const { getRequestDetails } = useRequestUsecase();

  useEffect(() => {
    if (requestId !== "create") {
      getRequestDetails({
        requestGuid: requestId,
        view: {
          setLoading,
          setRequestDetails,
        },
      });
    } else {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    if (requestDetails && !requestDetails.canEdit) {
      navigate(routes.requests);
    }
  }, [requestDetails]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Button asChild variant="ghost" size="icon" title={t("common.back")}>
            <Link to={contractId ? routes.contracts : routes.requests}>
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
            ) : (
              `${t(`desiredProfil.${requestDetails?.desiredProfile}`, {
                defaultValue: requestDetails?.desiredProfile,
              })} - ${t(`justifications.${requestDetails?.justification}`, {
                defaultValue: requestDetails?.justification,
              })}`
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

        {!loading && <RequestForm requestDetails={requestDetails} />}
      </div>
    </>
  );
}
