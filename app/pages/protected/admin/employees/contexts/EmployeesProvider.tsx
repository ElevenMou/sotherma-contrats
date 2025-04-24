import type { GetUserDetailsResponseModel } from "@/data/users/model/response/GetUserDetailsResponseModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface EmployeesContextModel {
  employees: Array<GetUserDetailsResponseModel>;
  setEmployees: React.Dispatch<
    React.SetStateAction<Array<GetUserDetailsResponseModel>>
  >;

  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export const EmployeesContext = createContext<EmployeesContextModel | null>(
  null
);

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<
    Array<GetUserDetailsResponseModel>
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const value = useMemo(
    () => ({
      employees,
      setEmployees,

      totalCount,
      setTotalCount,
    }),
    [employees]
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployeesContext = (): EmployeesContextModel => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployeesContext must be wrapped in EmployeesProvider");
  }
  return context;
};
