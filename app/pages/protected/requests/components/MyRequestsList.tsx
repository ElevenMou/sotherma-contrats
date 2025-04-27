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
import { generatePath, Link, useNavigate } from "react-router";
import { useRequestsContext } from "../contexts/RequestsProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/router/routes";
import { formatDateWithoutTime } from "@/lib/utils";

const MAX_RECORDS = 16;

const MyRequestsList = () => {
  const { t } = useTranslation();
  const { getRequestsList } = useRequestUsecase();
  const { userInfo } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const { requests, totalCount } = useRequestsContext();
  const [startIndex, setStartIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      await getRequestsList({
        request: {
          startIndex: startIndex,
          maxRecords: MAX_RECORDS,
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
            <TableRow
              key={request.guid}
              // onClick={() => navigate(`/requests/${request.guid}`)}
              // className="cursor-pointer"
            >
              <TableCell>{request.desiredProfile}</TableCell>
              <TableCell>{request.department}</TableCell>
              <TableCell>
                {t(`contracts.${request.contractType}`, {
                  defaultValue: request.contractType,
                })}
              </TableCell>
              <TableCell>{formatDateWithoutTime(request.startDate)}</TableCell>
              <TableCell>{formatDateWithoutTime(request.endDate)}</TableCell>
              <TableCell>
                {t(`justifications.${request.justification}`, {
                  defaultValue: request.justification,
                })}
              </TableCell>
              <TableCell>
                {t(`status.${request.status.toLocaleLowerCase()}`, {
                  defaultValue: request.status,
                })}
              </TableCell>
              <TableCell>{request.requesterFullName}</TableCell>
              {userInfo?.profile === userRoles.hr &&
                request.status === "Approved" && (
                  <TableCell className="w-[100px]">
                    <Button variant="link" onClick={() => {}} asChild>
                      <Link
                        to={generatePath(routes.requestContract, {
                          requestId: request.guid,
                        })}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {t("contracts.add_contract")}
                      </Link>
                    </Button>
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
