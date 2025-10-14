using OmDeHoek.Model.Data;
using OmDeHoek.Model.Repositories;

namespace OmDeHoek.Model;

public sealed class UnitOfWork : IDisposable
{
    private bool _disposed;
    private readonly DataContext _context;
    
    private readonly UserRepository _userRepository = null!;
    private readonly BuurtRepository _buurtRepository = null!;
    private readonly GemeenteRepository _gemeenteRepository = null!;
    private readonly PostcodeRepository _postcodeRepository = null!;
    private readonly AdresRepository _adresRepository = null!;
    
    public UnitOfWork(
        DataContext context,
        UserRepository userRepository = null,
        BuurtRepository buurtRepository = null,
        GemeenteRepository gemeenteRepository = null,
        PostcodeRepository postcodeRepository = null,
        AdresRepository adresRepository = null
        )
    {
        _context = context;
        _userRepository = userRepository;
        _buurtRepository = buurtRepository;
        _gemeenteRepository = gemeenteRepository;
        _postcodeRepository = postcodeRepository;
        _adresRepository = adresRepository;
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
    
    public BuurtRepository BuurtRepository
    {
        get {return _buurtRepository ?? new BuurtRepository(_context);}
    }
    
    public GemeenteRepository GemeenteRepository
    {
        get {return _gemeenteRepository ?? new GemeenteRepository(_context);}
    }
    
    public PostcodeRepository PostcodeRepository
    {
        get {return _postcodeRepository ?? new PostcodeRepository(_context);}
    }

    public AdresRepository AdresRepository
    {
        get {return _adresRepository ?? new AdresRepository(_context);}
    }
}