using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class DeelgemeenteRepository(DataContext ctx): GenericRepository<DeelGemeente> (ctx, ctx.DeelGemeentes)
{
    public async Task<DeelGemeente?> GetByNis6Async(string nis6)
    {
        return await DbSet
            .Include(d => d.Gemeente)
            .Include(d => d.Buurten)
            .Where(d => d.Nis6Code == nis6)
            .FirstOrDefaultAsync();
    }
}