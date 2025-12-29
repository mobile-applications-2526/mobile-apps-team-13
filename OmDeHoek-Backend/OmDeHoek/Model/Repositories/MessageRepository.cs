using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class MessageRepository(DataContext ctx) : GenericRepository<Message>(ctx, ctx.Messages)
{
    public async Task<List<Message>> GetFeedMessagesAsync(
        int page, 
        int pageSize, 
        string userId,
        string? postcode, 
        string? buurtSectorCode)
    {
        IQueryable<Message> query = DbSet.AsNoTracking();

        if (!string.IsNullOrEmpty(postcode))
        {
            query = query.Where(m => m.Buurt!.DeelGemeente!.Gemeente!.Postcodes.Any(p => p.Code == postcode));
        }

        if (!string.IsNullOrEmpty(buurtSectorCode))
        {
            query = query.Where(m => m.BuurtSectorCode == buurtSectorCode);
        }
        
        query = query.Where(m => m.Buurt!.Bewoners.Any(ub => ub.UserId == userId) || 
                                 (m.DeelGemeente != null && m.DeelGemeente.Buurten.Any(b => b.Bewoners.Any(ub => ub.UserId == userId))));

        query = query
            .OrderByDescending(m => m.CreatedAt)
            .Skip(page * pageSize)
            .Take(pageSize)
            .Include(m => m.User)
            .Include(m => m.Comments)
                .ThenInclude(c => c.User)
            .Include(m => m.LikedBy);

        return await query.ToListAsync();
    }
    
    public async Task<List<Message>> GetMessagesByUserIdAsync(string userId, int page = 0, int pageSize = 20)
    {
        return await DbSet
            .Where(m => m.UserId == userId)
            .OrderByDescending(m => m.CreatedAt)
            .Skip(page * pageSize)
            .Take(pageSize)
            .Include(m => m.Comments)
                .ThenInclude(c => c.User)
            .Include(m => m.LikedBy)
            .ToListAsync();
    }
    
    public async Task<Message?> GetMessageByIdAsync(Guid messageId)
    {
        var message = await DbSet
            .Include(m => m.User)
            .Include(m => m.Comments)
                .ThenInclude(c => c.User)
            .Include(m => m.LikedBy)
            .FirstOrDefaultAsync(m => m.Id == messageId);

        return message;
    }
}