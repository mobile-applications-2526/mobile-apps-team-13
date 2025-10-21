using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Utils;

public static class ConsoleUtils
{
    public static ConsoleColor DefaultColor {get;} = ConsoleColor.Gray;
        public static void LogWarning(string message)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[WARNING] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
            Console.ForegroundColor = DefaultColor;
        }
        public static void LogInfo(string message)
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine($"[INFO] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
            Console.ForegroundColor = DefaultColor;
        }

        public static void LogError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
            Console.ForegroundColor = DefaultColor;
        }

        public static void LogSuccess(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[SUCCESS] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
            Console.ForegroundColor = DefaultColor;
        }

        public static void LogDebug(string message)
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine($"[DEBUG] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
            Console.ForegroundColor = DefaultColor;
        }

        public static void LogException(Exception ex)
        {
            if(ex is ServiceException or DbUpdateException)
            {
                LogError(ex.ToString());
                return;
            }
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[EXCEPTION] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {ex.Message}\n{ex.StackTrace}");
            Console.ForegroundColor = DefaultColor;
        }

        public static void LogCustom(string prefix, string message, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine($"[{prefix}] {DateTime.Now:ddd dd/MM/yyyy HH:mm:ss:ff} {message}");
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