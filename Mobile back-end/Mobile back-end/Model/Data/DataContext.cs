using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Mobile_back_end.Model.Entities;

namespace Mobile_back_end.Model.Data;

public class DataContext : IdentityUserContext<User>
{
    public DbSet<User> Users { get; set; }
    public DbSet<Adress> Adresses { get; set; }
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            
            entity.HasIndex(u => u.NormalizedEmail).IsUnique();
            
            entity.HasMany(u => u.Adresses)
                .WithOne(a => a.Bewoner)
                .HasForeignKey(a => a.BewonerId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        builder.Entity<Adress>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Postcode).IsRequired();
            entity.Property(a => a.Straat).IsRequired();
            entity.Property(a => a.Huisnummer).IsRequired(false);
            entity.Property(a => a.Dorp).IsRequired();
        });
    }
}