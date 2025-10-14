using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Data;

public class DataContext : IdentityUserContext<User>
{
    public DbSet<User> Users { get; set; }
    public DbSet<Adres> Adresses { get; set; }
    public DbSet<Gemeente> Gemeentes { get; set; }
    public DbSet<DeelGemeente> DeelGemeentes { get; set; }
    public DbSet<Buurt> Buurten { get; set; }
    public DbSet<Postcode> Postcodes { get; set; }
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.BirthDate).IsRequired();
            
            entity.HasIndex(u => u.NormalizedEmail).IsUnique();
        });
        
        builder.Entity<Gemeente>(entity =>
        {
            entity.HasKey(g => g.NisCode);
            
            entity.Property(g => g.NaamNl).IsRequired();
            entity.Property(g => g.NaamFr).IsRequired();
        });

        builder.Entity<Postcode>(entity =>
        {
            entity.HasKey(p => new {p.Code, p.NisCodeGemeente});

            entity.HasOne(p => p.Gemeente)
                .WithMany(g => g.Postcodes)
                .HasForeignKey(p => p.NisCodeGemeente)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        builder.Entity<Adres>(entity =>
        {
            entity.HasKey(a => a.Id);
            
            entity.Property(a => a.Postcode).IsRequired();
            entity.Property(a => a.Straat).IsRequired();
            entity.Property(a => a.Huisnummer).IsRequired(false);
            entity.Property(a => a.Dorp).IsRequired();
            
            entity.HasOne(a => a.Bewoner)
                .WithMany(u => u.Adressen)
                .HasForeignKey(a => a.BewonerId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        builder.Entity<DeelGemeente>(entity =>
        {
            entity.HasKey(dg => dg.Nis6Code);
            
            entity.Property(dg => dg.NaamNl).IsRequired();
            entity.Property(dg => dg.NaamFr).IsRequired();
            
            entity.HasOne(dg => dg.Gemeente)
                .WithMany(g => g.DeelGemeentes)
                .HasForeignKey(dg => dg.NisCodeGemeente)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        builder.Entity<Buurt>(entity =>
        {
            entity.HasKey(b => b.StatistischeSectorCode);
            
            entity.Property(b => b.NaamNl).IsRequired();
            entity.Property(b => b.NaamFr).IsRequired();
            entity.Property(b => b.NaamDe).IsRequired();
            
            entity.HasOne(b => b.DeelGemeente)
                .WithMany(dg => dg.Buurten)
                .HasForeignKey(b => b.Nis6DeelGemeente)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}