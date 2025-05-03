import type { SiteDetailsModel } from "@/data/sites/model/response/SitesListItemModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface SitesContextModel {
  sites: SiteDetailsModel[];
  setSites: (sites: SiteDetailsModel[]) => void;

  totalCount: number;
  setTotalCount: (totalCount: number) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const SITES_MAX_RECORDS = 16;

export const SitesContext = createContext<SitesContextModel | null>(null);

export const SitesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sites, setSites] = useState<SiteDetailsModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      sites,
      setSites,

      totalCount,
      setTotalCount,

      loading,
      setLoading,
    }),
    [sites, totalCount, loading]
  );

  return (
    <SitesContext.Provider value={value}>{children}</SitesContext.Provider>
  );
};

export const useSitesContext = (): SitesContextModel => {
  const context = useContext(SitesContext);
  if (!context) {
    throw new Error("useSitesContext must be wrapped in SitesProvider");
  }
  return context;
};
