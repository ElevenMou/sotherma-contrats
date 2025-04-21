import { changeLanguage } from "i18next";
import { getLanguage } from "../i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languagesList = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
];

const ChangeLanguage = () => {
  const handleChangeLanguage = (selectedLanguage: string) => {
    changeLanguage(selectedLanguage);
  };
  return (
    <Select onValueChange={handleChangeLanguage} defaultValue={getLanguage()}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languagesList.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChangeLanguage;
