import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import apiClient from "../axios/apiClient";
import useDeltaPercentage from "../hooks/useDeltaPercentage";
import IExperimentConfig from "../models/IExperimentConfig";

const enum ExperimentState {
  NotLoaded = "NotLoaded",
  Ready = "Ready",
  Running = "Running",
  Paused = "Paused",
  Terminated = "Terminated",
}

interface IExperimentStatus {
  state: ExperimentState;
  populationCount: number;
  experimentId: string;
}

interface IUpdateStats {
  fitness: number;
}
export interface IBestGenome {
  srcIdx: number;
  tgtItx: number;
  weight: number;
}

type ExperimentContextObj = {
  state: ExperimentState;
  populationCount: number;
  populationInitialized: boolean;
  experimentId: string;
  experimentName: string;
  experimentDescription: string;
  config: IExperimentConfig | undefined;
  selectExperiment: (experiment: string) => void;
  patchConfiguration: (configPart: any) => void;
  isStartActive: boolean;
  isStopActive: boolean;
  isResetActive: boolean;
  fitness: number;
  fitnessPercentage: number;
  resetStats: () => void;
  updateStats: (update: IUpdateStats) => void;
  stopConditionSatisfied: boolean;
  setStopConditionSatisfied: (value: boolean) => void;
  bestGenome: IBestGenome[];
  setBestGenome: (genomes : IBestGenome[]) => void,
};

const getExperimentStatus = async () => {
  const response = await apiClient.get(`/experiment/status`);
  let status = response.data as IExperimentStatus;
  return status;
};

const getExperimentDetails = async (experimentId: string) => {
  const response = await apiClient.get(`/experiment/${experimentId}`);
  let status = response.data as IExperimentConfig;
  return status;
};

const ExperimentContext = React.createContext<ExperimentContextObj>({
  state: ExperimentState.NotLoaded,
  populationCount: 0,
  populationInitialized: false,
  experimentId: "",
  experimentDescription: "",
  experimentName: "",
  config: undefined,
  selectExperiment: () => {},
  patchConfiguration: () => {},
  isStartActive: false,
  isStopActive: false,
  isResetActive: false,
  fitness: 0,
  fitnessPercentage: 0,
  resetStats: () => {},
  updateStats: () => {},
  stopConditionSatisfied: false,
  setStopConditionSatisfied: () => {},
  bestGenome: [],
  setBestGenome: () => {},
});

const ExperimentContextProvider: React.FC = (props) => {
  const [selectedExperimentId, setSelectedExperimentId] = useState("");
  const { data: experimentStatus } = useQuery<IExperimentStatus, Error>(
    "experiment-status",
    getExperimentStatus
  );
  const { data: experimentDetails } = useQuery<IExperimentConfig, Error>(
    ["experiment-details", selectedExperimentId],
    () => getExperimentDetails(selectedExperimentId),
    {
      enabled: !!selectedExperimentId,
    }
  );
  const [configPatch, setConfigPatch] = useState({});
  const editedConfig = useMemo<IExperimentConfig>(() => {
    return { ...experimentDetails, ...configPatch } as IExperimentConfig;
  }, [experimentDetails, configPatch]);

  const isStartActive = useMemo(() => {
    return (
      (experimentStatus?.populationCount ?? 0) > 0 &&
      (experimentStatus?.state === ExperimentState.Ready ||
        experimentStatus?.state === ExperimentState.Paused)
    );
  }, [experimentStatus]);

  const isStopActive = useMemo(() => {
    return experimentStatus?.state === ExperimentState.Running;
  }, [experimentStatus]);

  const isResetActive = useMemo(() => {
    return (
      (experimentStatus?.populationCount ?? 0) > 0 &&
      (experimentStatus?.state === ExperimentState.Ready ||
        experimentStatus?.state === ExperimentState.Paused)
    );
  }, [experimentStatus]);

  const [fitness, fitnessPercentage, setFitness, resetFitness] =
    useDeltaPercentage(0);
  const [stopConditionSatisfied, setStopConditionSatisfied] = useState(false);

  const [bestGenome, setBestGenome] = useState<IBestGenome[]>([]);

  const contextValue: ExperimentContextObj = {
    state: experimentStatus?.state ?? ExperimentState.NotLoaded,
    populationCount: experimentStatus?.populationCount ?? 0,
    populationInitialized:
      (experimentStatus?.populationCount ?? 0) > 0 ? true : false,
    experimentId: experimentStatus?.experimentId ?? selectedExperimentId,
    experimentDescription: editedConfig?.description ?? "",
    experimentName: editedConfig?.name ?? "",
    config: editedConfig,
    selectExperiment: (experimentId) => {
      setConfigPatch({});
      setSelectedExperimentId(experimentId);
    },
    patchConfiguration: (patch) => {
      setConfigPatch((prev) => {
        return { ...prev, ...patch };
      });
    },
    isStartActive,
    isStopActive,
    isResetActive,
    fitness,
    fitnessPercentage,
    resetStats: () => {
      resetFitness();
      setStopConditionSatisfied(false);
    },
    updateStats: (update: IUpdateStats) => {
      setFitness(update.fitness);
    },
    stopConditionSatisfied,
    setStopConditionSatisfied,
    bestGenome,
    setBestGenome
  };

  return (
    <ExperimentContext.Provider value={contextValue}>
      {props.children}
    </ExperimentContext.Provider>
  );
};

export { ExperimentContext, ExperimentState };

export default ExperimentContextProvider;
