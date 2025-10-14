using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class PostcodeRepository(DataContext ctx) : GenericRepository<Postcode>(ctx, ctx.Postcodes)
{
    public async Task<IEnumerable<Postcode>> GetAllAsync()
    {
        return await DbSet
            .Include(p => p.Gemeente)
            .ToListAsync();
    }

    public async Task<Postcode?> GetByCodeAsync(string postcode)
    {
        return await DbSet
            .Include(p => p.Gemeente)
            .Where(p => p.Code == postcode)
            .FirstOrDefaultAsync();
    }
}