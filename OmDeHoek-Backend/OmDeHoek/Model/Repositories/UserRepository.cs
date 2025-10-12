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
}