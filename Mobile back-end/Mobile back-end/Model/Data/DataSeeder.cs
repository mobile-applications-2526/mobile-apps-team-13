using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Mobile_back_end.Model.Entities;
using Mobile_back_end.Utils;

namespace Mobile_back_end.Model.Data;

public static class DataSeeder
{
    public struct SeedData
    {
        public List<User> Users { get; set; } = new();
        public List<Adress> Adresses { get; set; } = new();

        public SeedData() {}
    }

    public static void EnsureUniqueIds<T, Q>(IEnumerable<T> list, Func<T, Q> idSelector, string entityName = nameof(T))
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
        
        // seed data
        
        // ensure unique ids
        EnsureUniqueIds(seedData.Users, u => u.Id, nameof(User));
        EnsureUniqueIds(seedData.Adresses, a => a.Id, nameof(Adress));
        
        return seedData;
    }
    
    private static bool AddOrUpdate<T>(DbSet<T> set, List<T> items) where T: class, IDataBaseEntity<T>
    {
        // Check if the set is null or empty
        if (set == null)
        {
            ConsoleUtils.LogError($"No Database of type {typeof(T)} found");
            return false;
        }
        
        uint addedItems = 0;
        uint skippedItems = 0;
        uint updatedItems = 0;
        foreach (var item in items)
        {
            // Check if the item already exists in the database
            var entry = set.FirstOrDefault(val => item.Equals(val));

            if (entry == null)
            {
                set.Add(item);
                addedItems++;
            }
            else
            {
                if(entry.HardEquals(item)){
                    // Skip adding the item if it already exists and is identical
                    skippedItems++;
                } else
                {
                    // Update the existing entry with the new values
                    entry.Update(item);

                    set.Update(entry);
                    updatedItems++;

                }
            }
        }

        ConsoleUtils.LogInfo($"Database of type {typeof(T)}: Added {addedItems}, Updated {updatedItems} items");
        return true;
    }

    public static void SeedDatabase(DataContext ctx)
    {
        var data = GenerateSeedData();
        var anyChanges = false;
        
        // Dit voor iedere entity die geseed wordt
        anyChanges |= AddOrUpdate(ctx.Users, data.Users);
        anyChanges |= AddOrUpdate(ctx.Adresses, data.Adresses);
        
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