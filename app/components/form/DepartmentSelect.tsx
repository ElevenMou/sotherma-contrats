import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DepartmentModel } from "@/data/departments/model/response/DepartmentModel";
import { useDepartmentUseCase } from "@/usecases/department/departmentUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

const DepartmentsSelect = ({
  value,
  disabled,
  defaultValue,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const { getAllDepartments } = useDepartmentUseCase();

  const [departments, setDepartments] = useState<DepartmentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangeLanguage = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      await getAllDepartments({
        view: {
          setDepartments,
          setLoading,
        },
      });
    };

    fetchDepartments();
  }, []);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && (
        <Select
          onValueChange={handleChangeLanguage}
          disabled={disabled}
          defaultValue={departments
            .find((department) => department.name === String(defaultValue))
            ?.id?.toString()}
          i18nIsDynamicList={true}
          name="department"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("employees.employee_department")} />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department.id} value={String(department.id)}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default DepartmentsSelect;
