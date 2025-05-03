import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface EmployeesContextModel {
  employees: Array<UserDetailsModel>;
  setEmployees: React.Dispatch<React.SetStateAction<Array<UserDetailsModel>>>;

  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EMPLOYEES_MAX_RECORDS = 16;
export const EmployeesContext = createContext<EmployeesContextModel | null>(
  null
);

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Array<UserDetailsModel>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      employees,
      setEmployees,

      totalCount,
      setTotalCount,

      loading,
      setLoading,
    }),
    [employees, totalCount, loading]
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
