namespace OmDeHoek.Model;

public static class Env
{
    public static string DbConnection { get; private set; } = "";
    public static string Environment { get; private set; } = "Development";
    public static bool IsDevelopment { get; private set; }
    public static bool IsProduction { get; private set; }
    public static bool IsTesting => Environment == "Testing";
    public static string GoogleClientId { get; private set; } = "";

    public static void SetEnvironment(
        string dbConnection,
        string environment,
        bool isProduction = false,
        bool isDevelopment = false,
        string googleClientId = ""
        )
    {
        DbConnection = dbConnection;
        Environment = environment;
        IsProduction = isProduction;
        IsDevelopment = isDevelopment;
        GoogleClientId = googleClientId;
    }
}