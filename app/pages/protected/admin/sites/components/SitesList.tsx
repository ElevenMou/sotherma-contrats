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
import { useUserUsecase } from "@/usecases/user/userUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteUseCase } from "@/usecases/site/siteUsecase";
import type { SitesListItemModel } from "@/data/sites/model/response/SitesListItemModel";

const MAX_RECORDS = 16;

const SitesList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getSitesList } = useSiteUseCase();

  const [sites, setSites] = useState<SitesListItemModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getSitesList({
        request: {
          startIndex: startIndex,
          maxRecords: MAX_RECORDS,
        },
        view: {
          setLoading,
          setSitesList: setSites,
          setTotalCount,
        },
      });
    };

    fetchUsers();
  }, [startIndex, MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("sites.site_code")}</TableHead>
          <TableHead>{t("sites.site_name")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: MAX_RECORDS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 7 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!loading &&
          sites?.length > 0 &&
          sites.map((site) => (
            <TableRow
              key={site.code}
              onClick={() => navigate(`/site/${site.guid}`)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{site.code}</TableCell>
              <TableCell>{site.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={MAX_RECORDS}
              currentPage={Math.floor(startIndex / MAX_RECORDS) + 1}
              onPageChange={handlePageChange}
              label={t("sites.title")}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SitesList;
