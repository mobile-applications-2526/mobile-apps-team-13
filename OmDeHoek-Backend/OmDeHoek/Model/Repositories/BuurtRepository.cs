using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class BuurtRepository(DataContext context) : GenericRepository<Buurt>(context, context.Buurten)
{
    public virtual async Task<Buurt?> GetByStatistischeSectorCodeAsync(string code)
    {
        return await DbSet
            .Include(b => b.DeelGemeente)
            .ThenInclude(dg => dg.Gemeente)
            .ThenInclude(b => b.Postcodes)
            .Include(b => b.Bewoners)
            .ThenInclude(ub => ub.User)
            .FirstOrDefaultAsync(b => b.StatistischeSectorCode == code);
    }

    public virtual async Task<IEnumerable<Buurt>> GetByDeelGemeenteNis6CodeAsync(string nis6Code)
    {
        return await DbSet
            .Include(b => b.DeelGemeente)
            .ThenInclude(dg => dg.Gemeente)
            .ThenInclude(g => g.Postcodes)
            .Where(b => b.Nis6DeelGemeente == nis6Code)
            .ToListAsync();
    }

    public virtual async Task<IEnumerable<Buurt>> GetByGemeenteNisCodeAsync(string nisCode)
    {
        return await DbSet
            .Include(b => b.DeelGemeente)
            .ThenInclude(dg => dg.Gemeente)
            .ThenInclude(g => g.Postcodes)
            .Include(b => b.Bewoners)
            .ThenInclude(ub => ub.User)
            .Where(b => b.DeelGemeente.NisCodeGemeente == nisCode)
            .ToListAsync();
    }

    public virtual async Task<IEnumerable<Buurt>> GetByGemeentePostcodeAsync(string postcode)
    {
        return await DbSet
            .Where(b => b.DeelGemeente.Gemeente.Postcodes.Any(p => p.Code == postcode))
            .Include(b => b.Bewoners)
            .ThenInclude(ub => ub.User)
            .ToListAsync();
    }
    
    public virtual async Task<IEnumerable<Buurt>> GetRecommendedForUser(string userId)
    {
        var query = DbSet.AsNoTracking();
        var postCodes = await context.Adresses.Where(a => a.BewonerId == userId)
            .Select(a => a.Postcode).ToListAsync();
        
        query = query.Where(b => b.Bewoners.All(ub => ub.UserId != userId));
        query = query.Where(b => postCodes.Any(p => b.DeelGemeente!.Gemeente!.Postcodes.Any(pc => pc.Code == p)));
        return await query
            .Include(b => b.DeelGemeente)
            .ThenInclude(dg => dg.Gemeente)
            .ThenInclude(g => g.Postcodes)
            .Include(b => b.Bewoners)
            .ThenInclude(ub => ub.User)
            .OrderByDescending(b => b.Bewoners.Count)
            .ThenBy(b => b.Nis6DeelGemeente)
            .ThenBy(b => b.StatistischeSectorCode)
            .ToListAsync();
    }
}