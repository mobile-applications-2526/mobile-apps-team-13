using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class UserRepository(DataContext context) : GenericRepository<User>(context, context.Users)
{
    public virtual async Task<User?> GetByEmailAsync(string email)
    {
        return await DbSet.FirstOrDefaultAsync(u => u.NormalizedEmail == email.ToUpper());
    }

    public virtual async Task<User?> GetByIdAsync(string id)
    {
        return await DbSet
            .Include(u => u.Adressen)
            .Include(u => u.Buurten)
            .ThenInclude(ub => ub.Buurt)
            .ThenInclude(b => b.DeelGemeente)
            .ThenInclude(dg => dg.Gemeente)
            .ThenInclude(g => g.Postcodes)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
    
    public virtual async Task<User?> GetByUserNameAsync(string username)
    {
        return await DbSet.FirstOrDefaultAsync(u => u.NormalizedUserName == username.ToUpper());
    }
}