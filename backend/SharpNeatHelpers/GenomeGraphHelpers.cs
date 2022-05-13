using SharpNeat.Neat.Genome;

namespace backend;
public static class GenomeGraphHelpers
{
    public static IEnumerable<GenomeConnection<T>> GetConnectionInfo<T>(this ConnectionGenes<T> connectionGenes) where T : struct
    {
        var result = new List<GenomeConnection<T>>();
        for (int i = 0; i < connectionGenes.Length; i++)
        {
            var conn = connectionGenes[i];
            result.Add(new GenomeConnection<T>
            {
                SrcIdx = conn.srcIdx,
                TgtItx = conn.tgtIdx,
                Weight = conn.weight
            });
        }
        return result;
    }
}

public record GenomeConnection<T> where T : struct
{
    public int SrcIdx { get; init; }
    public int TgtItx { get; init; }
    public T Weight { get; init; }
}