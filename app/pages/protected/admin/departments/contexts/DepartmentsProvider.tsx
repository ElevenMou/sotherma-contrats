import type { DepartmentListItemModel } from "@/data/departments/model/response/DepartmentListItemModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface DepartmentsContextModel {
  departments: DepartmentListItemModel[];
  setDepartments: (department: DepartmentListItemModel[]) => void;

  totalCount: number;
  setTotalCount: (totalCount: number) => void;

  startIndex: number;
  setStartIndex: (startIndex: number) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const DEPARTMENTS_MAX_RECORDS = 16;

export const DepartmentsContext = createContext<DepartmentsContextModel | null>(
  null
);

export const DepartmentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [departments, setDepartments] = useState<DepartmentListItemModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);

  const value = useMemo(
    () => ({
      departments,
      setDepartments,

      totalCount,
      setTotalCount,

      startIndex,
      setStartIndex,

      loading,
      setLoading,
    }),
    [departments, totalCount, startIndex, loading]
  );

  return (
    <DepartmentsContext.Provider value={value}>
      {children}
    </DepartmentsContext.Provider>
  );
};

export const useDepartmentsContext = (): DepartmentsContextModel => {
  const context = useContext(DepartmentsContext);
  if (!context) {
    throw new Error(
      "useDepartmentsContext must be wrapped in DepartmentsProvider"
    );
  }
  return context;
};
