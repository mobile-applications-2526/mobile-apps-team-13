using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Repositories;

public class GenericRepository<T>(DataContext context, DbSet<T> dbSet) where T : class, IDataBaseEntity<T>
{
    internal readonly DataContext Ctx = context;
    internal readonly DbSet<T> DbSet = dbSet;

    public GenericRepository(DataContext context) : this(context, context.Set<T>())
    {
    }

    public virtual async Task<IEnumerable<T>> Get(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string includeProperties = "")
    {
        IQueryable<T> query = DbSet.AsNoTracking();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        query = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

        if (orderBy != null)
        {
            return await orderBy(query).ToListAsync();
        }
        else
        {
            return await query.ToListAsync();
        }
    }

    public virtual async Task<T> GetById(object id)
    {
        var result = await DbSet.FindAsync(id);
        if (result == null)
        {
            throw new KeyNotFoundException($"Entity of type {typeof(T).Name} with id {id} not found.");
        }
        return result;
    }

    public virtual async Task<T> Insert(T entity)
    {
        var result = await DbSet.AddAsync(entity);
        return result.Entity;
    }

    public virtual async Task DeleteById(object id)
    {
        T entityToDelete = await GetById(id);
        Delete(entityToDelete);
    }

    public virtual void Delete(T entityToDelete)
    {
        if (Ctx.Entry(entityToDelete).State == EntityState.Detached)
        {
            DbSet.Attach(entityToDelete);
        }
        DbSet.Remove(entityToDelete);
    }

    public virtual T Update(T entityToUpdate)
    {
        DbSet.Attach(entityToUpdate);
        Ctx.Entry(entityToUpdate).State = EntityState.Modified;
        return entityToUpdate;
    }
}