using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using OmDeHoek.Model.Entities;
using OmDeHoek.Services;

namespace OmDeHoek.Hubs;

[Authorize]
public class MessageHub(ConnectionMappingService mappingService) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (userId != null)
        {
            mappingService.Add(userId, Context.ConnectionId);
        }
        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.UserIdentifier;
        if (userId != null)
        {
            mappingService.Remove(userId);
        }
        await base.OnDisconnectedAsync(exception);
    }
}