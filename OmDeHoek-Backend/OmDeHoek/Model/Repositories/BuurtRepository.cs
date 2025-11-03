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
            .Where(b => b.DeelGemeente.NisCodeGemeente == nisCode)
            .ToListAsync();
    }
}