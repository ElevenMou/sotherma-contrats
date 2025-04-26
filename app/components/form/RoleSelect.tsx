import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoles } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { useTranslation } from "react-i18next";

const roles = Object.values(userRoles);

const RoleSelect = ({
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
    <>
      <Select
        value={value}
        onValueChange={handleChangeLanguage}
        disabled={disabled}
        defaultValue={defaultValue}
        i18nIsDynamicList={true}
        name="site"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("employees.employee_site")} />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={String(role)}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default RoleSelect;
