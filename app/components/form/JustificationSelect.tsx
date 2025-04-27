import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const JustificationSelect = ({
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

  const justifications = [
    { value: "replace", label: t("justifications.replace") },
    { value: "create", label: t("justifications.create") },
    { value: "seasonal_work", label: t("justifications.seasonal_work") },
  ];

  return (
    <>
      <Select
        value={value}
        onValueChange={handleChangeLanguage}
        disabled={disabled}
        defaultValue={defaultValue}
        i18nIsDynamicList={true}
        name="justification"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("justifications.title")} />
        </SelectTrigger>
        <SelectContent>
          {justifications.map((justification) => (
            <SelectItem key={justification.value} value={justification.value}>
              {justification.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default JustificationSelect;
