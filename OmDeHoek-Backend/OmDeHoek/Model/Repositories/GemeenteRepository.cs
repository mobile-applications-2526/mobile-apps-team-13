using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class GemeenteRepository(DataContext context) : GenericRepository<Gemeente>(context, context.Gemeentes)
{
    public virtual async Task<Gemeente?> GetByNisCodeAsync(string nisCode)
    {
        return await DbSet
            .Include(g => g.DeelGemeentes)
            .ThenInclude(dg => dg.Buurten)
            .Include(g => g.Postcodes)
            .FirstOrDefaultAsync(g => g.NisCode == nisCode);
    }

    public virtual async Task<IEnumerable<Gemeente>> GetAllAsync()
    {
        return await DbSet
            .Include(g => g.Postcodes)
            .ToListAsync();
    }
    
    public virtual async Task<Gemeente?> GetByNaamAsync(string naam)
    {
        return await DbSet
            .Include(g => g.DeelGemeentes)
            .ThenInclude(dg => dg.Buurten)
            .Include(g => g.Postcodes)
            .FirstOrDefaultAsync(g => g.NaamNl.ToLower() == naam.ToLower() || g.NaamFr.ToLower() == naam.ToLower());
    }
    
    public virtual async Task<IEnumerable<Gemeente>> SearchByPostCodeAsync(string postCode)
    {
        return await DbSet
            .Include(g => g.DeelGemeentes)
            .ThenInclude(dg => dg.Buurten)
            .Include(g => g.Postcodes)
            .Where(g => g.Postcodes.Any(p => p.Code.StartsWith(postCode)))
            .ToListAsync();
    }
}