import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { useDepartmentManagementContext } from "../contexts/DepartmentManagementProvider";

const HrSelect = ({
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
  const { loading, usersList } = useDepartmentManagementContext();

  const handleChangeLanguage = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  useEffect(() => {
    if (defaultValue && usersList.hrList) {
      const selectedHr = usersList.hrList.find(
        (validator) => String(validator.userId) === defaultValue
      );

      if (selectedHr) {
        onChange(String(selectedHr.userId));
      }
    }
  }, [usersList]);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && usersList.hrList && (
        <Select
          onValueChange={handleChangeLanguage}
          disabled={disabled}
          defaultValue={defaultValue}
          i18nIsDynamicList={true}
          name="validator"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("departments.selectUser")} />
          </SelectTrigger>
          <SelectContent>
            {usersList.hrList.map((hr) => (
              <SelectItem key={hr.userId} value={String(hr.userId)}>
                {hr.userFullName} - {hr.userSite}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default HrSelect;
