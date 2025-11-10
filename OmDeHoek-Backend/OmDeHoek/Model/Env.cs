using OmDeHoek.Utils;

namespace OmDeHoek.Model;

public static class Env
{
    public static string DbConnection { get; private set; } = "";
    public static string Environment { get; private set; } = "Development";
    public static bool IsDevelopment { get; private set; }
    public static bool IsProduction { get; private set; }
    public static bool IsTesting => Environment == "Testing";
    public static string NotificationHubConnectionString { get; private set; } = "";
    public static string NotificationHubName { get; private set; } = "";

    public static void SetEnvironment(
        string dbConnection,
        string environment,
        string notificationHubConnectionString = "",
        string notificationHubName = "",
        bool isProduction = false,
        bool isDevelopment = false
        )
    {
        DbConnection = dbConnection;
        Environment = environment;
        NotificationHubConnectionString = notificationHubConnectionString;
        NotificationHubName = notificationHubName;
        if (string.IsNullOrEmpty(notificationHubConnectionString) || string.IsNullOrEmpty(notificationHubName))
        {
            ConsoleUtils.LogWarning("Notification Hub configuration ontbreekt. Negeer deze waarschuwing als je de app enkel runt om swagger te bekijken of voor development zonder notificaties.");
        }
        IsProduction = isProduction;
        IsDevelopment = isDevelopment;
    }
}