using Microsoft.AspNetCore.SignalR;

namespace OmDeHoek.Utils;

public class UserIdProvider : IUserIdProvider
{
    public string? GetUserId(HubConnectionContext connection)
    {
        return connection.User?.Identity?.Name;
    }
}