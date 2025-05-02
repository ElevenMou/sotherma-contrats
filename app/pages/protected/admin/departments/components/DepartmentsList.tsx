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
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useDepartmentUseCase } from "@/usecases/department/departmentUsecase";
import type { DepartmentListItemModel } from "@/data/departments/model/response/DepartmentListItemModel";

const MAX_RECORDS = 16;

const DepartmentsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getDepartmentsList } = useDepartmentUseCase();

  const [departments, setDepartments] = useState<DepartmentListItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * MAX_RECORDS);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getDepartmentsList({
        request: {
          startIndex: startIndex,
          maxRecords: MAX_RECORDS,
        },
        view: {
          setLoading,
          setDepartments,
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
          <TableHead>{t("departments.department_name")}</TableHead>
          <TableHead>{t("departments.first_validator")}</TableHead>
          <TableHead>{t("departments.second_validator")}</TableHead>
          <TableHead>{t("departments.hr")}</TableHead>
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
          departments?.length > 0 &&
          departments.map((department) => (
            <TableRow
              key={department.guid}
              onClick={() => navigate(`/departments/${department.guid}`)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.firstValidator}</TableCell>
              <TableCell>{department.secondValidator}</TableCell>
              <TableCell>{department.hr}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={MAX_RECORDS}
              currentPage={Math.floor(startIndex / MAX_RECORDS) + 1}
              onPageChange={handlePageChange}
              label={t("departments.title")}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DepartmentsList;
