import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const ContractTypeSelect = ({
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

  const contractTypes = [
    { value: "CDD", label: "CDD" },
    { value: "temporary", label: t("contracts.temporary") },
  ];

  return (
    <>
      <Select
        value={value}
        onValueChange={handleChangeLanguage}
        disabled={disabled}
        defaultValue={defaultValue}
        i18nIsDynamicList={true}
        name="contractType"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("contracts.contract_type")} />
        </SelectTrigger>
        <SelectContent>
          {contractTypes.map((contractType) => (
            <SelectItem key={contractType.value} value={contractType.value}>
              {contractType.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ContractTypeSelect;
