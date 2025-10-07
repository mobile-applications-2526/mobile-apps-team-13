using Microsoft.EntityFrameworkCore;
using Mobile_back_end.Model.Data;
using Mobile_back_end.Model.Entities;

namespace Mobile_back_end.Model.Repositories;

public class UserRepository(DataContext context) : GenericRepository<User>(context, context.Users)
{
    public virtual async Task<User?> GetByEmailAsync(string email)
    {
        return await DbSet.FirstOrDefaultAsync(u => u.NormalizedEmail == email.ToUpper());
    }
}