import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DepartmentSlectItemModel } from "@/data/departments/model/response/DepartmentSlectItemModel";
import { useDepartmentUseCase } from "@/usecases/department/departmentUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { departmentProfileRelations } from "@/constants/DepatmentProfilRelation";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const DepartmentsSelect = ({
  value,
  disabled,
  defaultValue,
  profile,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  profile?: string;
  onChange: (value?: string) => void;
}) => {
  const { t } = useTranslation();
  const { getAllDepartments } = useDepartmentUseCase();

  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const [departmentOptions, setDepartmentOptions] = useState<
    DepartmentSlectItemModel[]
  >([]);
  const [departments, setDepartments] = useState<DepartmentSlectItemModel[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const handleSelectChange = (selectedDepartment: string) => {
    setSelectedValue(selectedDepartment);
    onChange(selectedDepartment);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue("");
    onChange(undefined);
  };

  // Update local state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

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

  useEffect(() => {
    if (defaultValue && departments.length > 0) {
      const selectedDepartment = departments.find(
        (department) =>
          String(department.id) === defaultValue ||
          department.name === defaultValue
      );

      if (selectedDepartment) {
        setSelectedValue(String(selectedDepartment.id));
        onChange(String(selectedDepartment.id));
      }
    }
  }, [departments, defaultValue]);

  useEffect(() => {
    if (profile && departments.length > 0) {
      // Find departments that are related to this profile
      const relatedDepartmentIds: string[] = [];

      Object.entries(departmentProfileRelations).forEach(
        ([deptId, profiles]) => {
          if (profiles.includes(profile)) {
            relatedDepartmentIds.push(deptId);
          }
        }
      );

      if (relatedDepartmentIds.length === 0) {
        setDepartmentOptions(departments);
        return;
      }

      // Filter departments based on the profile
      const filteredDepartments = departments.filter((department) =>
        relatedDepartmentIds.includes(String(department.id))
      );

      setDepartmentOptions(filteredDepartments);
    } else {
      setDepartmentOptions(departments);
    }
  }, [profile, departments]);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && (
        <div className="relative">
          {selectedValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              type="button"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 rounded-sm z-10"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Select
            value={selectedValue}
            onValueChange={handleSelectChange}
            disabled={disabled}
            i18nIsDynamicList={true}
            name="department"
          >
            <SelectTrigger className={`w-full${selectedValue ? " pr-10" : ""}`}>
              <SelectValue placeholder={t("employees.employee_department")} />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map((department) => (
                <SelectItem key={department.id} value={String(department.id)}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default DepartmentsSelect;
