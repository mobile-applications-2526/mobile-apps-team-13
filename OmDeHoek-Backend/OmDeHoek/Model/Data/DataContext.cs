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
    public DbSet<UserBuurt> UserBuurten { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<MessageReaction> MessageReactions { get; set; }
    public DbSet<UserLikedPost> UserLikedPosts { get; set; }

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
            entity.HasKey(p => new { p.Code, p.NisCodeGemeente });

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

        builder.Entity<UserBuurt>(entity =>
        {
            entity.HasKey(ub => new { ub.UserId, ub.SectorCodeBuurt });

            entity.HasOne(ub => ub.User)
                .WithMany(u => u.Buurten)
                .HasForeignKey(ub => ub.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ub => ub.Buurt)
                .WithMany(b => b.Bewoners)
                .HasForeignKey(ub => ub.SectorCodeBuurt)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Message>(entity =>
        {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.Title).IsRequired();
            entity.Property(m => m.Content).IsRequired();
            entity.Property(m => m.CreatedAt).IsRequired();

            entity.HasOne(m => m.User)
                .WithMany()
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(m => m.Buurt)
                .WithMany(b => b.Messages)
                .HasForeignKey(m => m.BuurtSectorCode)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        builder.Entity<MessageReaction>(entity =>
        {
            entity.HasKey(mr => mr.Id);

            entity.Property(mr => mr.CreatedAt).IsRequired();

            entity.HasOne(mr => mr.User)
                .WithMany()
                .HasForeignKey(mr => mr.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(mr => mr.Message)
                .WithMany(m => m.Comments)
                .HasForeignKey(mr => mr.MessageId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(rt => rt.Id);
            
            entity.Property(rt => rt.TokenHash).IsRequired();
            entity.Property(rt => rt.ExpiresAt).IsRequired();
            entity.HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        builder.Entity<UserLikedPost>(entity =>
        {
            entity.HasKey(ulp => new { ulp.UserId, ulp.PostId });

            entity.HasOne(ulp => ulp.User)
                .WithMany()
                .HasForeignKey(ulp => ulp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ulp => ulp.Post)
                .WithMany(m => m.LikedBy)
                .HasForeignKey(ulp => ulp.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}