import type { DepartmentManagementDetailsModel } from "@/data/department-management/model/request/DepartmentManagementDetailsModel";
import type { GetDepartmentManagementUsersListModel } from "@/data/department-management/model/response/GetDepartmentManagementUsersListModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface DepartmentManagementContextModel {
  departmentManagement: DepartmentManagementDetailsModel | undefined;
  setDepartmentManagement: React.Dispatch<
    React.SetStateAction<DepartmentManagementDetailsModel | undefined>
  >;

  usersList: GetDepartmentManagementUsersListModel;
  setUsersList: React.Dispatch<
    React.SetStateAction<GetDepartmentManagementUsersListModel>
  >;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentManagementContext =
  createContext<DepartmentManagementContextModel | null>(null);

export const DepartmentManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [departmentManagement, setDepartmentManagement] =
    useState<DepartmentManagementDetailsModel>();

  const [usersList, setUsersList] =
    useState<GetDepartmentManagementUsersListModel>(
      {} as GetDepartmentManagementUsersListModel
    );
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      departmentManagement,
      setDepartmentManagement,

      usersList,
      setUsersList,

      loading,
      setLoading,
    }),
    [departmentManagement, loading]
  );

  return (
    <DepartmentManagementContext.Provider value={value}>
      {children}
    </DepartmentManagementContext.Provider>
  );
};

export const useDepartmentManagementContext =
  (): DepartmentManagementContextModel => {
    const context = useContext(DepartmentManagementContext);
    if (!context) {
      throw new Error(
        "useDepartmentManagementContext must be wrapped in DepartmentManagementProvider"
      );
    }
    return context;
  };
