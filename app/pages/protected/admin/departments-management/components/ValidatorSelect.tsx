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

const ValidatorSelect = ({
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
    if (defaultValue && usersList.validatorsList) {
      const selectedValidator = usersList.validatorsList.find(
        (validator) => String(validator.userId) === defaultValue
      );

      if (selectedValidator) {
        onChange(String(selectedValidator.userId));
      }
    }
  }, [usersList.validatorsList, loading]);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && usersList.validatorsList && (
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
            {usersList.validatorsList.map((manager) => (
              <SelectItem key={manager.userId} value={String(manager.userId)}>
                {manager.userFullName} - {manager.userSite}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default ValidatorSelect;
