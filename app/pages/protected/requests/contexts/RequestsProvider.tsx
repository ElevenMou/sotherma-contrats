import type { RequestListItemModel } from "@/data/requests/model/response/RequestModel";
import { createContext, useContext, useMemo, useState } from "react";

export interface RequestsContextModel {
  requests: Array<RequestListItemModel>;
  setRequests: React.Dispatch<React.SetStateAction<Array<RequestListItemModel>>>;

  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;

  requestsToValidate: Array<RequestListItemModel>;
  setRequestsToValidate: React.Dispatch<
    React.SetStateAction<Array<RequestListItemModel>>
  >;

  requestsToValidateCount: number;
  setRequestsToValidateCount: React.Dispatch<React.SetStateAction<number>>;
}

export const RequestsContext = createContext<RequestsContextModel | null>(null);

export const RequestsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [requests, setRequests] = useState<Array<RequestListItemModel>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [requestsToValidate, setRequestsToValidate] = useState<
    Array<RequestListItemModel>
  >([]);
  const [requestsToValidateCount, setRequestsToValidateCount] =
    useState<number>(0);

  const value = useMemo(
    () => ({
      requests,
      setRequests,

      totalCount,
      setTotalCount,

      requestsToValidate,
      setRequestsToValidate,

      requestsToValidateCount,
      setRequestsToValidateCount,
    }),
    [requests, requestsToValidate, totalCount, requestsToValidateCount]
  );

  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequestsContext = (): RequestsContextModel => {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error("useRequestsContext must be wrapped in RequestsProvider");
  }
  return context;
};
