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
import { useUserAdminUsecase } from "@/usecases/user/userUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  EMPLOYEES_MAX_RECORDS,
  useEmployeesContext,
} from "../contexts/EmployeesProvider";
import { Skeleton } from "@/components/ui/skeleton";
import SetActiveStatus from "./SetActiveStatus";

const EmployeesList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getUsersList } = useUserAdminUsecase();

  const { employees, totalCount, loading } = useEmployeesContext();
  const [startIndex, setStartIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setStartIndex((page - 1) * EMPLOYEES_MAX_RECORDS);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsersList({
        request: {
          startIndex: startIndex,
          maxRecords: EMPLOYEES_MAX_RECORDS,
        },
      });
    };

    fetchUsers();
  }, [startIndex, EMPLOYEES_MAX_RECORDS]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("employees.employee_id")}</TableHead>
          <TableHead>{t("employees.employee_department")}</TableHead>
          <TableHead>{t("employees.employee_lastname")}</TableHead>
          <TableHead>{t("employees.employee_firstname")}</TableHead>
          <TableHead>{t("employees.employee_email")}</TableHead>
          <TableHead>{t("employees.employee_site")}</TableHead>
          <TableHead>Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: EMPLOYEES_MAX_RECORDS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 7 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!loading &&
          employees?.length > 0 &&
          employees.map((employee) => (
            <TableRow key={employee.code} className="hover:bg-muted/50">
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.code}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.department}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.lastName}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.firstName}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.email}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/employees/${employee.guid}`)}
                className="cursor-pointer"
              >
                {employee.site}
              </TableCell>
              <TableCell>
                {t(`roles.${employee.profile}`, {
                  defaultValue: employee.profile,
                })}
              </TableCell>
              <TableCell>
                <SetActiveStatus
                  userGuid={employee.guid || ""}
                  isDisabled={employee.disabled || false}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={EMPLOYEES_MAX_RECORDS}
              currentPage={Math.floor(startIndex / EMPLOYEES_MAX_RECORDS) + 1}
              onPageChange={handlePageChange}
              label={t("employees.title")}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default EmployeesList;
