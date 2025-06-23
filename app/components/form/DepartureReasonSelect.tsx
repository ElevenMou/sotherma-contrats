import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const DepartureReasonSelect = ({
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

  const handleChange = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  const profiles = [
    {
      value: "resignation",
      label: t("departureReason.resignation"),
    },
    {
      value: "FCO",
      label: t("departureReason.FCO"),
    },
    {
      value: "retirement",
      label: t("departureReason.retirement"),
    },
    {
      value: "dismissal",
      label: t("departureReason.dismissal"),
    },
    {
      value: "other",
      label: t("departureReason.other"),
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
          <SelectValue
            placeholder={
              placeholder ? placeholder : t("requests.departureReason")
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
    </>
  );
};

export default DepartureReasonSelect;
