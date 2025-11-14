using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class RefreshTokenRepository(DataContext ctx) : GenericRepository<RefreshToken>(ctx, ctx.RefreshTokens)
{
    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await DbSet
            .Where(rt => rt.TokenHash == token)
            .Include(rt => rt.User)
            .FirstOrDefaultAsync();
    }
}