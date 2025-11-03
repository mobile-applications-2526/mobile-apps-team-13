using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class AdresRepository(DataContext ctx) : GenericRepository<Adres>(ctx, ctx.Adresses)
{
    public virtual async Task<Adres?> GetByAdressId(Guid id)
    {
        return await DbSet
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public virtual async Task<IEnumerable<Adres>> GetByUserId(string userId)
    {
        return await DbSet
            .Where(a => a.BewonerId == userId)
            .ToListAsync();
    }
}