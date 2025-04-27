import type { CurrentUserInfoModel } from "@/data/users/model/response/CurrentUserInfoResponseModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface GlobalContextModel {
  userInfo: CurrentUserInfoModel | null;
  setUserInfo: React.Dispatch<
    React.SetStateAction<CurrentUserInfoModel | null>
  >;
}

export const GlobalContext = createContext<GlobalContextModel | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<CurrentUserInfoModel | null>(null);

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
    throw new Error("useGlobalContext must be wrapped in GlobalProvider");
  }
  return context;
};
