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
import { useSiteUseCase } from "@/usecases/site/siteUsecase";
import SiteFormDialog from "./SiteFormDialog";
import { Edit } from "lucide-react";
import { SITES_MAX_RECORDS, useSitesContext } from "../contexts/SitesProvider";

const SitesList = () => {
  const { t } = useTranslation();
  const { getSitesList } = useSiteUseCase();

  const { loading, totalCount, sites } = useSitesContext();
  const [startIndex, setStartIndex] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * SITES_MAX_RECORDS);
  };

  const fetchSites = async () => {
    await getSitesList({
      request: {
        startIndex: startIndex,
        maxRecords: SITES_MAX_RECORDS,
      },
    });
  };

  useEffect(() => {
    fetchSites();
  }, [startIndex, SITES_MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("sites.site_code")}</TableHead>
          <TableHead>{t("sites.site_name")}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: SITES_MAX_RECORDS }).map((_, i) => (
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
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell>{site.code}</TableCell>
              <TableCell>{site.name}</TableCell>
              <TableCell className="text-right">
                <SiteFormDialog
                  key={site.code}
                  siteId={site.guid}
                  variant="ghost"
                >
                  <Edit className="text-primary" />
                </SiteFormDialog>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={SITES_MAX_RECORDS}
              currentPage={Math.floor(startIndex / SITES_MAX_RECORDS) + 1}
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
