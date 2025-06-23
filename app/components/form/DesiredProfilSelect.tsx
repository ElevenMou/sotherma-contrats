import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const DesiredProfilSelect = ({
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

  const handleChange = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  const profiles = [
    {
      value: "delivery_assistant",
      label: t("desiredProfil.delivery_assistant"),
    },
    {
      value: "driver_sales_assistant",
      label: t("desiredProfil.driver_sales_assistant"),
    },
    { value: "sales_assistant", label: t("desiredProfil.sales_assistant") },
    {
      value: "driver_sales",
      label: t("desiredProfil.driver_sales"),
    },
    { value: "forklift_operator", label: t("desiredProfil.forklift_operator") },
    {
      value: "warehouse_assistant",
      label: t("desiredProfil.warehouse_assistant"),
    },
    {
      value: "material_handler",
      label: t("desiredProfil.material_handler"),
    },
    {
      value: "operator",
      label: t("desiredProfil.operator"),
    },
    {
      value: "machine_operator",
      label: t("desiredProfil.machine_operator"),
    },
    {
      value: "maintenance_technician",
      label: t("desiredProfil.maintenance_technician"),
    },
    {
      value: "warehouse_worker",
      label: t("desiredProfil.warehouse_worker"),
    },
    {
      value: "invoice_operator",
      label: t("desiredProfil.invoice_operator"),
    },
    {
      value: "other",
      label: t("desiredProfil.other"),
    },
  ];

  return (
    <>
      <Select
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
        defaultValue={defaultValue}
        i18nIsDynamicList={true}
        name="contractType"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("requests.desiredProfile")} />
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile) => (
            <SelectItem key={profile.value} value={profile.value}>
              {profile.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default DesiredProfilSelect;
