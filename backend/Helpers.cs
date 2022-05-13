using System.Reflection;

namespace backend
{
    public interface IHelpers
    {
        string GetRootPath();
    }
    public class Helpers : IHelpers
    {
        public string GetRootPath()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
    public static class HelpersInstaller
    {
        public static IServiceCollection AddHelpers(this IServiceCollection services)
        {
            services.AddScoped<IHelpers, Helpers>();
            return services;
        }
    }
}
