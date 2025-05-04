import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/layout/Loading";
import type { Route } from "./+types/request-details";
import RequestForm from "./components/RequestForm";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import RequestReview from "./components/RequestReview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Request details" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function RequestDetails({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const { requestId } = params;

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
    }
  }, [requestId]);
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Button asChild variant="ghost" size="icon" title={t("common.back")}>
            <Link to={routes.requests}>
              <ArrowLeftCircle className="size-5" />
            </Link>
          </Button>
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>
            {requestId === "create" ? (
              t("requests.add_request")
            ) : loading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              `${requestDetails?.desiredProfile} - ${t(
                `justifications.${requestDetails?.justification}`,
                {
                  defaultValue: requestDetails?.justification,
                }
              )}`
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

        {!loading && requestId === "create" && (
          <RequestForm requestDetails={requestDetails} />
        )}

        {!loading && requestId !== "create" && (
          <RequestReview requestDetails={requestDetails} />
        )}
      </div>
    </>
  );
}
