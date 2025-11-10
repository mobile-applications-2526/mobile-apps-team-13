using OmDeHoek.Model;
using OmDeHoek.Model.Repositories;
using OmDeHoek.Services;

namespace OmDeHoek.Utils;

public static class DependencyInjections
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<ILogger, Logger<IStartup>>();

        services.AddSingleton<TokenManager>();

        // Repositories
        services.AddScoped<UserRepository>();
        services.AddScoped<BuurtRepository>();
        services.AddScoped<GemeenteRepository>();
        services.AddScoped<PostcodeRepository>();
        services.AddScoped<AdresRepository>();
        services.AddScoped<UserBuurtRepository>();
        services.AddScoped<MessageRepository>();
        services.AddScoped<DeelgemeenteRepository>();

        // Services
        services.AddScoped<TokenService>();
        services.AddScoped<AuthService>();
        services.AddScoped<BuurtService>();
        services.AddScoped<GemeenteService>();
        services.AddScoped<AdresService>();
        services.AddScoped<UserService>();
        services.AddScoped<MessageService>();

        // Unit of Work
        services.AddScoped<UnitOfWork>();

        return services;
    }
}