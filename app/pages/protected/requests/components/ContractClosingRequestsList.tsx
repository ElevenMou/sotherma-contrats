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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { formatDateWithoutTime } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import type { ClosingContractRequestListItemModel } from "@/data/contracts/model/response/ClosingContractRequestListItemModel";

const MAX_RECORDS = 13;

const ContractClosingRequestsList = () => {
  const { t } = useTranslation();
  const { getClosingRequestsList } = useContractUsecase();
  const [loading, setLoading] = useState(true);
  const [closingRequestsList, setClosingRequestsList] = useState<
    ClosingContractRequestListItemModel[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);

  const [startIndex, setStartIndex] = useState(0);

  const fetchRequests = async () => {
    await getClosingRequestsList({
      request: {
        startIndex: startIndex,
        maxRecords: MAX_RECORDS,
      },
      view: {
        setClosingRequestsList,
        setTotalCount,
        setLoading,
      },
    });
  };

  const handleAcceptRequest = async (requestId: string) => {
    fetchRequests();
  };

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  useEffect(() => {
    fetchRequests();
  }, [startIndex, MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("common.startDate")}</TableHead>
          <TableHead>{t("common.endDate")}</TableHead>
          <TableHead>{t("contracts.providerFirstName")}</TableHead>
          <TableHead>{t("contracts.providerLastName")}</TableHead>
          <TableHead>{t("contracts.contractedPhone")}</TableHead>
          <TableHead>{t("requests.reason")}</TableHead>
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
          closingRequestsList.map((request) => (
            <TableRow key={request.contractGuid}>
              <TableCell>{formatDateWithoutTime(request.startDate)}</TableCell>
              <TableCell>{formatDateWithoutTime(request.endDate)}</TableCell>
              <TableCell>{request.contractedFirstName}</TableCell>
              <TableCell>{request.contractedLastName}</TableCell>
              <TableCell>{request.contractedPhone}</TableCell>
              <TableCell>{request.closingReason}</TableCell>
              <TableCell>{request.requesterFullName}</TableCell>
              <TableCell className="w-[100px]">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size="icon"
                  variant="destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="default"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
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

export default ContractClosingRequestsList;
