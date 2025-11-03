using System.Collections.Concurrent;

namespace OmDeHoek.Services;

public class ConnectionMappingService
{
    private readonly ConcurrentDictionary<string, string> _connections = new();

    public void Add(string userId, string connectionId)
    {
        _connections[userId] = connectionId;
    }
    
    public string? GetConnectionId(string userId)
    {
        _connections.TryGetValue(userId, out var connectionId);
        return connectionId;
    }

    public void Remove(string userId)
    {
        _connections.TryRemove(userId, out _);
    }
}