using Mobile_back_end.Model.Data;
using Mobile_back_end.Model.Repositories;

namespace Mobile_back_end.Model;

public sealed class UnitOfWork : IDisposable
{
    private bool _disposed;
    private readonly DataContext _context;
    
    private readonly UserRepository _userRepository = null!;
    
    public UnitOfWork(
        DataContext context,
        UserRepository userRepository = null
        )
    {
        _context = context;
        _userRepository = userRepository;
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
    
    public async Task StartTransaction()
    {
        await _context.Database.BeginTransactionAsync();
    }
    
    public async Task CommitTransaction()
    {
        await _context.Database.CommitTransactionAsync();
    }
    
    public async Task RollbackTransaction()
    {
        await _context.Database.RollbackTransactionAsync();
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    private void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            _disposed = true;
        }
    }

    public UserRepository UserRepository
    {
        get {return _userRepository ?? new UserRepository(_context);}
    }
}