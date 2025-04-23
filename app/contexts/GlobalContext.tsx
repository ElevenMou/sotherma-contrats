import type { UserInfoModel } from "@/data/auth/model/response/UserInfoResponseModel";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface GlobalContextModel {
  userInfo: UserInfoModel | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoModel | null>>;
}

export const GlobalContext = createContext<GlobalContextModel | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);

  const value = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextModel => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useBusinessContext must be wrapped in GlobalProvider");
  }
  return context;
};
