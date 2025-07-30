import { Separator } from "@radix-ui/react-separator";
import { Link, useLocation } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/layout/Loading";
import type { Route } from "./+types/request-details";
import RequestForm from "./components/RequestForm";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import RequestReview from "./components/RequestReview";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sotherma Contracts" },
    { name: "description", content: "Welcome to requests!" },
  ];
}

export default function RequestDetails({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { getContractDetails } = useContractUsecase();

  const [loading, setLoading] = useState<boolean>(true);

  const { requestId } = params;
  const { state } = useLocation();
  const { contractId } = state || {};

  const [requestDetails, setRequestDetails] = useState<RequestDetailsModel>();
  const [contractDetails, setContractDetails] =
    useState<ContractDetailsModel>();

  const { getRequestDetails } = useRequestUsecase();

  useEffect(() => {
    if (contractId) {
      getContractDetails({
        request: { guid: contractId },
        view: {
          setLoading: setLoading,
          setContractDetails,
        },
      });
    }
  }, [contractId]);

  useEffect(() => {
    const requestGuid =
      requestId !== "create" && !contractId
        ? requestId
        : contractDetails?.requestGuid;
    if (requestGuid) {
      getRequestDetails({
        requestGuid,
        view: {
          setLoading,
          setRequestDetails,
        },
      });
    } else {
      setLoading(false);
    }
  }, [requestId, contractId, contractDetails]);
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
            {requestId === "create" ? (
              t("requests.add_request")
            ) : loading ? (
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

        {!loading && requestId === "create" && (
          <RequestForm
            requestDetails={requestDetails}
            contractDetails={contractDetails}
          />
        )}

        {!loading && requestId !== "create" && requestDetails && (
          <RequestReview requestDetails={requestDetails} />
        )}
      </div>
    </>
  );
}
