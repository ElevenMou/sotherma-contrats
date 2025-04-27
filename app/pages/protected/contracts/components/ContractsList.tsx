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
import { formatDateWithoutTime } from "@/lib/utils";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import type { ContractListItemModel } from "@/data/contracts/model/response/ContractListItemModel";
import ExtendContract from "./ExtendContract";

const MAX_RECORDS = 13;

const ContractsList = () => {
  const { t } = useTranslation();
  const { getList, closeContract } = useContractUsecase();

  const [constractsList, setContractsList] = useState<ContractListItemModel[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);

  const fetchContracts = async () => {
    setLoading(true);
    await getList({
      request: {
        startIndex: startIndex,
        maxRecords: MAX_RECORDS,
      },
      view: {
        setLoading,
        setContractsList,
        setTotalCount,
      },
    });
  };

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  const handleCloseContract = async (contractId: string) => {
    setLoading(true);
    await closeContract({
      guid: contractId,
      view: {
        setLoading,
      },
    });
  };

  useEffect(() => {
    fetchContracts();
  }, [startIndex, MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("common.startDate")}</TableHead>
          <TableHead>{t("common.endDate")}</TableHead>
          <TableHead>{t("contracts.providerFirstName")}</TableHead>
          <TableHead>{t("contracts.providerLastName")}</TableHead>
          <TableHead>{t("contracts.providerEmail")}</TableHead>
          <TableHead>{t("common.status")}</TableHead>
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
          constractsList.map((contract) => (
            <TableRow key={contract.guid}>
              <TableCell>{formatDateWithoutTime(contract.startDate)}</TableCell>
              <TableCell>{formatDateWithoutTime(contract.endDate)}</TableCell>
              <TableCell>{contract.providerFirstName}</TableCell>
              <TableCell>{contract.providerLastName}</TableCell>
              <TableCell>{contract.providerEmail}</TableCell>
              <TableCell>
                {t(`status.${contract?.statusLabel?.toLocaleLowerCase()}`, {
                  defaultValue: contract.statusLabel,
                })}
              </TableCell>
              <TableCell className="w-[200px]">
                {contract.statusLabel !== "Closed" && (
                  <Button
                    variant="destructive"
                    onClick={() => handleCloseContract(contract.guid || "")}
                  >
                    {t("common.close")}
                  </Button>
                )}
                <ExtendContract contractId={contract.guid || ""} />
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
              label={t("menu.contracts")}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ContractsList;
