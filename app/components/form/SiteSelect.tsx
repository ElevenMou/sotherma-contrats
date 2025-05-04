import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AllSitesItemModel } from "@/data/sites/model/response/AllSitesItemModel";
import { useSiteUseCase } from "@/usecases/site/siteUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

const SitesSelect = ({
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
  const { getAllSites } = useSiteUseCase();

  const [sites, setSites] = useState<AllSitesItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangeLanguage = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  useEffect(() => {
    const fetchSites = async () => {
      await getAllSites({
        view: {
          setSites,
          setLoading,
        },
      });
    };

    fetchSites();
  }, []);

  useEffect(() => {
    if (defaultValue) {
      const selectedSite = sites.find((site) => site.id === defaultValue);
      if (selectedSite) {
        onChange(String(selectedSite.id));
      }
    }
  }, [sites]);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && (
        <Select
          onValueChange={handleChangeLanguage}
          disabled={disabled}
          defaultValue={sites
            .find((site) => site.id === defaultValue)
            ?.id?.toString()}
          i18nIsDynamicList={true}
          name="site"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("employees.employee_site")} />
          </SelectTrigger>
          <SelectContent>
            {sites.map((site) => (
              <SelectItem key={site.id} value={String(site.id)}>
                {site.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default SitesSelect;
