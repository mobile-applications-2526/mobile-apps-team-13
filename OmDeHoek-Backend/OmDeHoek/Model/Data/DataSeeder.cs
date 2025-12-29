using ClosedXML.Excel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OmDeHoek.Model.Entities;
using OmDeHoek.Utils;

namespace OmDeHoek.Model.Data;

public static class DataSeeder
{
    private const string SeedGemeenten = "Model/Data/SeedData/Gemeenten.xlsx";
    private const string SeedDeelgemeenten = "Model/Data/SeedData/Deelgemeenten.xlsx";
    private const string SeedBuurten = "Model/Data/SeedData/Buurten.xlsx";
    private const string SeedPostcodeMapping = "Model/Data/SeedData/PostcodeMapping.xlsx";

    public struct SeedData
    {
        public List<User> Users { get; set; } = new();
        public List<Adres> Adresses { get; set; } = new();
        public List<Gemeente> Gemeentes { get; set; } = new();
        public List<DeelGemeente> DeelGemeentes { get; set; } = new();
        public List<Buurt> Buurten { get; set; } = new();
        public List<Postcode> Postcodes { get; set; } = new();
        public List<UserBuurt> UserBuurten { get; set; } = new();
        public List<Message> Messages { get; set; } = new();

        public SeedData() { }
    }

    private static void EnsureUniqueIds<T, Q>(IEnumerable<T> list, Func<T, Q> idSelector, string entityName = nameof(T))
    {
        var idSet = new HashSet<Q>();
        foreach (var item in list)
        {
            var id = idSelector(item);
            if (!idSet.Add(id))
            {
                throw new ArgumentException($"Duplicate ID found in {entityName}: {id}");
            }
        }
    }

    private static SeedData GenerateSeedData()
    {
        var hasher = new PasswordHasher<User>();

        var seedData = new SeedData();

        seedData.Gemeentes = ExcelFileReader.ReadExcelGemeenten(SeedGemeenten);
        seedData.DeelGemeentes = ExcelFileReader.ReadExcelDeelGemeenten(SeedDeelgemeenten);
        seedData.Buurten = ExcelFileReader.ReadExcelBuurten(SeedBuurten, seedData.Gemeentes);
        seedData.Postcodes = ExcelFileReader.ReadExcelPostcodes(SeedPostcodeMapping);

        // ensure unique ids
        ConsoleUtils.LogInfo("Ensuring unique PKs in seed data...");

        EnsureUniqueIds(seedData.Users, u => u.Id, nameof(User));
        EnsureUniqueIds(seedData.Adresses, a => a.Id, nameof(Adres));
        EnsureUniqueIds(seedData.Gemeentes, g => g.NisCode, nameof(Gemeente));
        EnsureUniqueIds(seedData.DeelGemeentes, dg => dg.Nis6Code, nameof(DeelGemeente));
        EnsureUniqueIds(seedData.Buurten, b => b.StatistischeSectorCode, nameof(Buurt));
        EnsureUniqueIds(seedData.Postcodes, p => new { p.Code, p.NisCodeGemeente }, nameof(Postcode));
        EnsureUniqueIds(seedData.UserBuurten, ub => new { ub.UserId, ub.SectorCodeBuurt }, nameof(UserBuurt));
        EnsureUniqueIds(seedData.Messages, m => m.Id, nameof(Message));

        ConsoleUtils.LogInfo("All PKs are unique in seed data.");

        return seedData;
    }

    private static async Task<bool> AddOrUpdate<T>(DbSet<T> set, List<T> items) where T : class, IDataBaseEntity<T>, new()
    {
        if (set is null)
        {
            ConsoleUtils.LogError($"No Database of type {typeof(T)} found");
            return false;
        }

        var comparer = new T();

        var downloadedSet = await set.ToHashSetAsync(comparer: comparer);

        uint addedItems = 0;
        uint skippedItems = 0;
        uint updatedItems = 0;
        foreach (var item in items)
        {
            if (!downloadedSet.TryGetValue(item, out var entry))
            {
                set.Add(item);
                addedItems++;
            }
            else
            {
                if (entry.HardEquals(item))
                {
                    // Skip adding the item if it already exists and is identical
                    skippedItems++;
                }
                else
                {
                    // Update the existing entry with the new values
                    entry.Update(item);

                    set.Update(entry);
                    updatedItems++;

                }
            }
        }

        ConsoleUtils.LogInfo($"Database of type {typeof(T)}: Added {addedItems}, Updated {updatedItems} items, Skipped {skippedItems} items.");
        return true;
    }

    public static async Task SeedDatabase(DataContext ctx)
    {
        if (ctx == null)
        {
            ConsoleUtils.LogError("No Database context provided");
            return;
        }

        ConsoleUtils.LogInfo("Starting database seeding...");

        var data = GenerateSeedData();
        var anyChanges = false;

        // Dit voor iedere entity die geseed wordt
        anyChanges |= await AddOrUpdate(ctx.Users, data.Users);
        anyChanges |= await AddOrUpdate(ctx.Adresses, data.Adresses);
        anyChanges |= await AddOrUpdate(ctx.Gemeentes, data.Gemeentes);
        anyChanges |= await AddOrUpdate(ctx.DeelGemeentes, data.DeelGemeentes);
        anyChanges |= await AddOrUpdate(ctx.Buurten, data.Buurten);
        anyChanges |= await AddOrUpdate(ctx.Postcodes, data.Postcodes);
        anyChanges |= await AddOrUpdate(ctx.UserBuurten, data.UserBuurten);
        anyChanges |= await AddOrUpdate(ctx.Messages, data.Messages);

        if (anyChanges)
        {
            ctx.SaveChanges();
            ConsoleUtils.LogInfo("Database seeding completed.");
        }
        else
        {
            ConsoleUtils.LogInfo("No changes detected. Database seeding skipped.");
        }
    }
}