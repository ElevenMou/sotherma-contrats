import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/layout/Loading";
import RequestContractForm from "./components/RequestContractForm";
import type { Route } from "./+types/request-contract";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import RequestDetailsCard from "./components/RequestDetailsCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sotherma Contracts" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function RequestContract({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const { getRequestDetails } = useRequestUsecase();

  const [requestDetails, setRequestDetails] =
    useState<RequestDetailsModel | null>(null);

  useEffect(() => {
    getRequestDetails({
      requestGuid: params.requestId,
      view: {
        setLoading,
        setRequestDetails,
      },
    });
  }, [params.requestId]);
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
            {loading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              t(`desiredProfil.${requestDetails?.desiredProfile}`, {
                defaultValue: requestDetails?.desiredProfile,
              })
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

        {!loading && requestDetails && (
          <RequestDetailsCard requestDetails={requestDetails} />
        )}

        {!loading && (
          <RequestContractForm
            contractDetails={null}
            requestGuid={params.requestId}
          />
        )}
      </div>
    </>
  );
}
