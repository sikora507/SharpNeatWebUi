import React, { useMemo } from "react";
import { useQuery } from "react-query";
import apiClient from "../axios/apiClient";

const enum BackendStatus {
  Checking,
  Online,
  Offline,
}

type StatusContextObj = {
  backendStatus: BackendStatus;
};

const checkBackendHealth = async () => {
  const response = await apiClient.get(`/health`);
  if (response.status == 200) {
    return true;
  }
  return false;
};

const StatusContext = React.createContext<StatusContextObj>({
  backendStatus: BackendStatus.Checking
});

const StatusContextProvider: React.FC = (props) => {

  const { isLoading: healthLoading, isError: healthIsError, data: healthData } = useQuery<boolean, Error>(
    "backend-health",
    checkBackendHealth
  );

  const backendStatus = useMemo<BackendStatus>(
    () => {
      if (healthLoading) {
        return BackendStatus.Checking;
      }
      if (healthIsError || !healthData) {
        return BackendStatus.Offline;
      }
      if (healthData === true) {
        return BackendStatus.Online;
      }
      return BackendStatus.Offline;
    },
    [healthLoading, healthData, healthIsError]);

  const contextValue: StatusContextObj = {
    backendStatus: backendStatus
  };

  return (
    <StatusContext.Provider value={contextValue}>
      {props.children}
    </StatusContext.Provider>
  );
};

export { StatusContext, BackendStatus };

export default StatusContextProvider;
