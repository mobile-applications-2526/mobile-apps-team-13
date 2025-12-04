using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class UserLikedPostRepository(DataContext ctx) : GenericRepository<UserLikedPost>(ctx, ctx.UserLikedPosts)
{
    public async Task<int> CountLikesForPostAsync(Guid postId)
    {
        return await DbSet.CountAsync(ulp => ulp.PostId == postId && ulp.IsLiked);
    }
    
    public async Task<UserLikedPost?> GetUserLikeStatusAsync(string userId, Guid postId)
    {
        return await DbSet.FirstOrDefaultAsync(ulp => ulp.UserId == userId && ulp.PostId == postId);
    }
}