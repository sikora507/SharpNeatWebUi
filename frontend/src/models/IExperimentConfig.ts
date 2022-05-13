export default interface IExperimentConfig {
  name: string;
  description: string;
  id: string;
  isAcyclic: boolean;
  activationFnName: string;
  evolutionAlgorithmSettings: EvolutionAlgorithmSettings;
  reproductionAsexualSettings: ReproductionAsexualSettings;
  reproductionSexualSettings: ReproductionSexualSettings;
  populationSize: number;
  initialInterconnectionsProportion: number;
  connectionWeightScale: number;
  complexityRegulationStrategy: ComplexityRegulationStrategy;
  degreeOfParallelism: number;
  enableHardwareAcceleratedNeuralNets: boolean;
  enableHardwareAcceleratedActivationFunctions: boolean;
  cyclesPerActivation: number;
  customEvaluationSchemeConfig: any;
}

export interface ComplexityRegulationStrategy {
  strategyName: string;
  complexityCeiling: number;
  minSimplifcationGenerations: number;
}

export interface EvolutionAlgorithmSettings {
  speciesCount: number;
  elitismProportion: number;
  selectionProportion: number;
  offspringAsexualProportion: number;
  offspringSexualProportion: number;
  interspeciesMatingProportion: number;
}

export interface ReproductionAsexualSettings {
  connectionWeightMutationProbability: number;
  addNodeMutationProbability: number;
  addConnectionMutationProbability: number;
  deleteConnectionMutationProbability: number;
}

export interface ReproductionSexualSettings {
  secondaryParentGeneProbability: number;
}
