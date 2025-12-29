using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Utils;

public static class ConsoleUtils
{
    public static ILogger Logger { get; } = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger("GlobalLogger");
    public static ConsoleColor DefaultColor { get; } = ConsoleColor.Gray;
    public static void LogWarning(string message)
    {
        Logger.LogWarning("[WARNING] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, message);
    }
    public static void LogInfo(string message)
    {
        Logger.LogInformation("[INFO] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, message);
    }

    public static void LogError(string message)
    {
        Logger.LogError("[ERROR] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, message);
    }

    public static void LogSuccess(string message)
    {
        Logger.Log(LogLevel.Information, "[SUCCESS] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, message);
    }

    public static void LogDebug(string message)
    {
        Logger.LogDebug("[DEBUG] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, message);
    }

    public static void LogException(Exception ex)
    {
        if (ex is ServiceException or Microsoft.EntityFrameworkCore.DbUpdateException)
        {
            LogError(ex.ToString());
            return;
        }
        Console.ForegroundColor = ConsoleColor.Red;
        Logger.LogCritical(ex, "[EXCEPTION] {DateTime:dd/MM/yyyy HH:mm:ss:ff} {Message}", DateTime.Now, ex.Message);
        Console.ForegroundColor = DefaultColor;
    }

    public static void ClearConsole()
    {
        Console.Clear();
    }

    public static string GetUserInput(string prompt)
    {
        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.Write($"{prompt}: ");
        Console.ForegroundColor = DefaultColor;
        return Console.ReadLine() ?? string.Empty;
    }
}