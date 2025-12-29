using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class MessageReactionRepository(DataContext ctx) : GenericRepository<MessageReaction>(ctx, ctx.MessageReactions)
{
    public async Task<List<MessageReaction>> GetReactionsForMessageAsync(Guid messageId)
    {
        return await DbSet
            .Where(mr => mr.MessageId == messageId)
            .ToListAsync();
    }
}