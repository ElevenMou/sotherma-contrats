import Pagination from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRequestsContext } from "../contexts/RequestsProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import RejectRequest from "./RejectRequest";
import { formatDateWithoutTime } from "@/lib/utils";
import { useNavigate } from "react-router";
import RequestHistory from "./RequestHistory";

const MAX_RECORDS = 13;

const RequestsList = () => {
  const { t } = useTranslation();
  const { getRequestsListToValidate, acceptRequest } = useRequestUsecase();
  const [loading, setLoading] = useState(true);
  const { requestsToValidate, requestsToValidateCount } = useRequestsContext();
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    await getRequestsListToValidate({
      request: {
        startIndex: startIndex,
        maxRecords: MAX_RECORDS,
      },
      view: {
        setLoading,
      },
    });
  };

  const handleAcceptRequest = async (requestId: string) => {
    await acceptRequest({
      request: {
        requestGuid: requestId,
      },
    });
    fetchRequests();
  };

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  const handleRowClick = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  };

  useEffect(() => {
    fetchRequests();
  }, [startIndex, MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("requests.desiredProfile")}</TableHead>
          <TableHead>{t("common.department")}</TableHead>
          <TableHead>{t("requests.contractType")}</TableHead>
          <TableHead>{t("common.startDate")}</TableHead>
          <TableHead>{t("common.endDate")}</TableHead>
          <TableHead>{t("requests.justification")}</TableHead>
          <TableHead>{t("common.status")}</TableHead>
          <TableHead>{t("requests.requesterFullName")}</TableHead>
          <TableHead className="w-[100px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: MAX_RECORDS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 9 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-9 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!loading &&
          requestsToValidate.map((request) => (
            <TableRow key={request.guid}>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {t(`desiredProfil.${request.desiredProfile}`, {
                  defaultValue: request.desiredProfile,
                })}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {request.department}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {t(`contracts.type.${request.contractType}`, {
                  defaultValue: request.contractType,
                })}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {formatDateWithoutTime(request.startDate)}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {formatDateWithoutTime(request.endDate)}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {t(`justifications.${request.justification}`, {
                  defaultValue: request.justification,
                })}
              </TableCell>
              <TableCell>
                <span className="flex justify-between items-center gap-1">
                  {t(`status.${request.status.toLocaleLowerCase()}`, {
                    defaultValue: request.status,
                  })}
                  <RequestHistory requestGuid={request.guid} />
                </span>
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(request.guid)}
                className="cursor-pointer"
              >
                {request.requesterFullName}
              </TableCell>
              <TableCell className="w-[100px]">
                <RejectRequest
                  requestId={request.guid}
                  refreshList={fetchRequests}
                />
                <Button
                  size="icon"
                  variant="default"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptRequest(request.guid);
                  }}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>
            <Pagination
              totalItems={requestsToValidateCount}
              itemsPerPage={MAX_RECORDS}
              currentPage={Math.floor(startIndex / MAX_RECORDS) + 1}
              onPageChange={handlePageChange}
              label={t("menu.requests")}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RequestsList;
