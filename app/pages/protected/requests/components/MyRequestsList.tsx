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
import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, Link, useNavigate } from "react-router";
import { useRequestsContext } from "../contexts/RequestsProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/router/routes";
import { formatDateWithoutTime } from "@/lib/utils";
import RequestHistory from "./RequestHistory";
import NotifyProvider from "./NotifyProvider";
import { FilePlus } from "lucide-react";

const MAX_RECORDS = 14;

const MyRequestsList: FC<{ isCompleted?: boolean }> = ({ isCompleted }) => {
  const { t } = useTranslation();
  const { getRequestsList } = useRequestUsecase();
  const { userInfo } = useGlobalContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const { requests, totalCount } = useRequestsContext();
  const [startIndex, setStartIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  const handleRowClick = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      await getRequestsList({
        request: {
          startIndex: startIndex,
          maxRecords: MAX_RECORDS,
          isCompleted,
        },
        view: {
          setLoading,
        },
      });
    };

    fetchRequests();
  }, [startIndex, MAX_RECORDS]);

  const COLS_NUMBER = userInfo?.profile === userRoles.hr ? 9 : 8;
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
          {userInfo?.profile === userRoles.hr && (
            <TableHead className="w-[100px]" />
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: MAX_RECORDS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({
                length: COLS_NUMBER,
              }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!loading &&
          requests.map((request) => (
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
              <TableCell>{request.requesterFullName}</TableCell>
              {userInfo?.profile === userRoles.hr &&
                request.status === "Approved" && (
                  <TableCell>
                    <Button variant="secondary" className="mr-2" asChild>
                      <Link
                        to={generatePath(routes.requestContract, {
                          requestId: request.guid,
                        })}
                        title={t("contracts.add_contract")}
                      >
                        <FilePlus />
                      </Link>
                    </Button>
                    {request.providerEmail && (
                      <NotifyProvider requestGUID={request.guid} />
                    )}
                  </TableCell>
                )}
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={COLS_NUMBER}>
            <Pagination
              totalItems={totalCount}
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

export default MyRequestsList;
