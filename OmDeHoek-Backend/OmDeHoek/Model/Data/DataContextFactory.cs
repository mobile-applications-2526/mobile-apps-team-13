using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using OmDeHoek.Utils;

namespace OmDeHoek.Model.Data;

public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
        ConsoleUtils.LogInfo($"Environment: {environment}");

        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        var appsettings = environment == "Development" ? "appsettings.Development.json" : "appsettings.json";
        var configuration = new ConfigurationBuilder().AddJsonFile(appsettings).AddEnvironmentVariables().Build();

        var connectionString = configuration.GetConnectionString("devConnection");

        optionsBuilder.UseNpgsql(connectionString);

        optionsBuilder.EnableDetailedErrors();
        optionsBuilder.EnableSensitiveDataLogging();

        var context = new DataContext(optionsBuilder.Options);

        if (IsDatabaseUpdateCommand())
        {
            var pendingMigrations = context.Database.GetPendingMigrations();

            if (pendingMigrations.Any())
            {
                Console.WriteLine("migrating database...");
                context.Database.Migrate();
                Console.WriteLine("database migrated");
            }

            SeedDatabase(context, configuration);
        }

        return context;
    }

    private bool IsDatabaseUpdateCommand()
    {
        var commandLine = Environment.CommandLine.ToLower();

        return commandLine.Contains("ef") && commandLine.Contains("database") && commandLine.Contains("update");
    }

    public static void SeedDatabase(DataContext context, IConfiguration configuration)
    {
        try
        {
            DataSeeder.SeedDatabase(context);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
            throw;
        }
    }
}