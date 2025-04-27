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
import { useNavigate } from "react-router";
import { useRequestsContext } from "../contexts/RequestsProvider";
import { Skeleton } from "@/components/ui/skeleton";

const MAX_RECORDS = 16;

const MyRequestsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getRequestsList } = useRequestUsecase();
  const [loading, setLoading] = useState(true);
  const { requests, totalCount } = useRequestsContext();
  const [startIndex, setStartIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: MAX_RECORDS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 8 }).map((_, index) => (
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
              <TableCell>{request.contractType}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>
                {t(`justifications.${request.justification}`, {
                  defaultValue: request.justification,
                })}
              </TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.requesterFullName}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>
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
