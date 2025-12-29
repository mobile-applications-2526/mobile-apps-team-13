using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class UserBuurtRepository(DataContext ctx) : GenericRepository<UserBuurt>(ctx, ctx.UserBuurten)
{

}