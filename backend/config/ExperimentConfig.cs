using Newtonsoft.Json;

// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
public class EvolutionAlgorithmSettings
{
    [JsonProperty("speciesCount")]
    public int SpeciesCount { get; set; }

    [JsonProperty("elitismProportion")]
    public double ElitismProportion { get; set; }

    [JsonProperty("selectionProportion")]
    public double SelectionProportion { get; set; }

    [JsonProperty("offspringAsexualProportion")]
    public double OffspringAsexualProportion { get; set; }

    [JsonProperty("offspringSexualProportion")]
    public double OffspringSexualProportion { get; set; }

    [JsonProperty("interspeciesMatingProportion")]
    public double InterspeciesMatingProportion { get; set; }
}

public class ReproductionAsexualSettings
{
    [JsonProperty("connectionWeightMutationProbability")]
    public double ConnectionWeightMutationProbability { get; set; }

    [JsonProperty("addNodeMutationProbability")]
    public double AddNodeMutationProbability { get; set; }

    [JsonProperty("addConnectionMutationProbability")]
    public double AddConnectionMutationProbability { get; set; }

    [JsonProperty("deleteConnectionMutationProbability")]
    public double DeleteConnectionMutationProbability { get; set; }
}

public class ReproductionSexualSettings
{
    [JsonProperty("secondaryParentGeneProbability")]
    public double SecondaryParentGeneProbability { get; set; }
}

public class ComplexityRegulationStrategy
{
    [JsonProperty("strategyName")]
    public string StrategyName { get; set; }

    [JsonProperty("complexityCeiling")]
    public int ComplexityCeiling { get; set; }

    [JsonProperty("minSimplifcationGenerations")]
    public int MinSimplifcationGenerations { get; set; }
}

public class ExperimentConfig
{
    [JsonProperty("name")]
    public string Name { get; set; }

    public string Id { get; set; }
    public string Description { get; set; }

    [JsonProperty("isAcyclic")]
    public bool IsAcyclic { get; set; }

    [JsonProperty("activationFnName")]
    public string ActivationFnName { get; set; }

    [JsonProperty("evolutionAlgorithmSettings")]
    public EvolutionAlgorithmSettings EvolutionAlgorithmSettings { get; set; }

    [JsonProperty("reproductionAsexualSettings")]
    public ReproductionAsexualSettings ReproductionAsexualSettings { get; set; }

    [JsonProperty("reproductionSexualSettings")]
    public ReproductionSexualSettings ReproductionSexualSettings { get; set; }

    [JsonProperty("populationSize")]
    public int PopulationSize { get; set; }

    [JsonProperty("initialInterconnectionsProportion")]
    public double InitialInterconnectionsProportion { get; set; }

    [JsonProperty("connectionWeightScale")]
    public double ConnectionWeightScale { get; set; }

    [JsonProperty("complexityRegulationStrategy")]
    public ComplexityRegulationStrategy ComplexityRegulationStrategy { get; set; }

    [JsonProperty("degreeOfParallelism")]
    public int DegreeOfParallelism { get; set; }

    [JsonProperty("enableHardwareAcceleratedNeuralNets")]
    public bool EnableHardwareAcceleratedNeuralNets { get; set; }

    [JsonProperty("enableHardwareAcceleratedActivationFunctions")]
    public bool EnableHardwareAcceleratedActivationFunctions { get; set; }
    
    [JsonProperty("cyclesPerActivation")]
    public int CyclesPerActivation { get; set; }

    [JsonProperty("customEvaluationSchemeConfig")]
    public Dictionary<string,string> CustomEvaluationSchemeConfig { get; set; } = new Dictionary<string, string>();
}
