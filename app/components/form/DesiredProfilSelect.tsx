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
import profiles from "@/constants/profiles";
import { departmentProfileRelations } from "@/constants/DepatmentProfilRelation";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const DesiredProfilSelect = ({
  value,
  disabled,
  defaultValue,
  placeholder,
  department,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  department?: string;
  onChange: (value?: string) => void;
}) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const [otherValue, setOtherValue] = useState("");
  const [profileOptions, setProfileOptions] = useState(profiles);

  const handleSelectChange = (selectedProfile: string) => {
    setSelectedValue(selectedProfile);

    if (selectedProfile === "other") {
      setOtherValue("");
    } else if (selectedProfile === "") {
      // Handle clear - reset everything
      setOtherValue("");
      onChange("");
    } else {
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

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue("");
    onChange(undefined);
    setOtherValue("");
  };

  // Update local state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const predefinedValues = profileOptions.map((p) => p.value);
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

  useEffect(() => {
    if (department) {
      const departmentKey = Object.keys(departmentProfileRelations).find(
        (key) => key.includes(department.toLocaleLowerCase())
      ) as keyof typeof departmentProfileRelations;

      if (!departmentKey) {
        setProfileOptions(profiles);
        return;
      }

      const relatedProfiles = departmentProfileRelations[departmentKey] || [];
      setProfileOptions(
        profiles.filter((profile) => relatedProfiles.includes(profile.value))
      );
    } else {
      setProfileOptions(profiles);
    }
  }, [department]);

  return (
    <div className="space-y-2">
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
          name="contractType"
        >
          <SelectTrigger className={`w-full${selectedValue ? " pr-10" : ""}`}>
            <SelectValue
              placeholder={
                placeholder ? placeholder : t("requests.desiredProfile")
              }
            />
          </SelectTrigger>
          <SelectContent>
            {profileOptions.map((profile) => (
              <SelectItem key={profile.value} value={profile.value}>
                {t(profile.label, {
                  defaultValue: profile.label,
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
