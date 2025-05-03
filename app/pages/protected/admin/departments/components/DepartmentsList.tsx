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
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useDepartmentUseCase } from "@/usecases/department/departmentUsecase";
import {
  DEPARTMENTS_MAX_RECORDS,
  useDepartmentsContext,
} from "../contexts/DepartmentsProvider";
import DepartmentFormDialog from "./DepartmentFormDialog";

const DepartmentsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getDepartmentsList } = useDepartmentUseCase();

  const { departments, loading, startIndex, totalCount, setStartIndex } =
    useDepartmentsContext();

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * DEPARTMENTS_MAX_RECORDS);
  };

  const navigateToDepartmentManagement = (id: string) => {
    navigate(`/departments/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getDepartmentsList({
        request: {
          startIndex: startIndex,
          maxRecords: DEPARTMENTS_MAX_RECORDS,
        },
      });
    };

    fetchUsers();
  }, [startIndex, DEPARTMENTS_MAX_RECORDS]);

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
          Array.from({ length: DEPARTMENTS_MAX_RECORDS }).map((_, i) => (
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
            <TableRow key={department.guid} className="hover:bg-muted/50">
              <TableCell>
                <DepartmentFormDialog
                  variant="ghost"
                  departmentId={department.guid}
                  className="w-full justify-start"
                >
                  {department.name}
                </DepartmentFormDialog>
              </TableCell>
              <TableCell>
                <Link
                  to={`/departments/${department.guid}`}
                  className="w-full justify-start"
                >
                  {department.firstValidator || t("common.define")}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/departments/${department.guid}`}
                  className="w-full justify-start"
                >
                  {department.secondValidator || t("common.define")}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/departments/${department.guid}`}
                  className="w-full justify-start"
                >
                  {department.hr || t("common.define")}
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={DEPARTMENTS_MAX_RECORDS}
              currentPage={Math.floor(startIndex / DEPARTMENTS_MAX_RECORDS) + 1}
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
