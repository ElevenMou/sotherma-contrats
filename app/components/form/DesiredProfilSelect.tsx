import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const DesiredProfilSelect = ({
  value,
  disabled,
  defaultValue,
  placeholder,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const [otherValue, setOtherValue] = useState("");

  const handleSelectChange = (selectedProfile: string) => {
    setSelectedValue(selectedProfile);

    if (selectedProfile === "other") {
      // When "other" is selected, we'll wait for the user to type in the input
      setOtherValue("");
    } else {
      // For predefined values, call onChange immediately
      setOtherValue("");
      onChange(selectedProfile);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setOtherValue(inputValue);
    // Pass the custom value to the parent component
    onChange(inputValue);
  };

  // Update local state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const predefinedValues = profiles.map((p) => p.value);
      if (predefinedValues.includes(value)) {
        setSelectedValue(value);
        setOtherValue("");
      } else if (value) {
        // This is a custom "other" value
        setSelectedValue("other");
        setOtherValue(value);
      }
    }
  }, [value]);

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
    <div className="space-y-2">
      <Select
        value={selectedValue}
        onValueChange={handleSelectChange}
        disabled={disabled}
        i18nIsDynamicList={true}
        name="contractType"
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              placeholder ? placeholder : t("requests.desiredProfile")
            }
          />
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile) => (
            <SelectItem key={profile.value} value={profile.value}>
              {profile.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedValue === "other" && (
        <Input
          type="text"
          placeholder={t("desiredProfil.specifyOther") || "Please specify..."}
          value={otherValue}
          onChange={handleOtherInputChange}
          disabled={disabled}
          className="w-full"
        />
      )}
    </div>
  );
};

export default DesiredProfilSelect;
