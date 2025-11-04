using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class MessageRepository(DataContext ctx): GenericRepository<Message>(ctx, ctx.Messages)
{
    
}