import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const departmentsList = [
  { id: "1", name: "IT" },
  { id: "2", name: "Finance" },
  { id: "3", name: "HR" },
  { id: "4", name: "Marketing" },
  { id: "5", name: "Sales" },
  { id: "6", name: "Operations" },
  { id: "7", name: "Legal" },
  { id: "8", name: "Engineering" },
];

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
  const handleChangeLanguage = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };
  return (
    <Select
      onValueChange={handleChangeLanguage}
      disabled={disabled}
      value={value?.toString()}
      defaultValue={departmentsList
        .find((department) => department.name === String(defaultValue))
        ?.id?.toString()}
      i18nIsDynamicList={true}
      name="department"
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("employees.employee_department")} />
      </SelectTrigger>
      <SelectContent>
        {departmentsList.map((department) => (
          <SelectItem key={department.id} value={String(department.id)}>
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DepartmentsSelect;
