using Mobile_back_end.Model;
using Mobile_back_end.Model.Repositories;
using Mobile_back_end.Services;

namespace Mobile_back_end.Utils;

public static class DependencyInjections
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<ILogger, Logger<IStartup>>();

        services.AddSingleton<TokenManager>();

        // Repositories
        services.AddScoped<UserRepository>();
        
        // Services
        services.AddScoped<AuthService>();

        // Unit of Work
        services.AddScoped<UnitOfWork>();
        
        return services;
    }
}