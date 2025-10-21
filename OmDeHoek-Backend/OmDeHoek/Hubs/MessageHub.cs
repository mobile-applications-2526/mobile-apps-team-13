using Microsoft.AspNetCore.SignalR;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Hubs;

public class MessageHub : Hub
{
    public async Task MessageSent(string user, Message message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}