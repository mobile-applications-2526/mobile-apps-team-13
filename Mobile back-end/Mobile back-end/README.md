# De back-end gebruiken

## Database connection string

De database connection string is te vinden in de `appsettings.Development.json` file. Deze string bevat alle informatie die nodig is om verbinding te maken met de database, zoals de servernaam, database naam, gebruikersnaam en wachtwoord. Default staat dit op localhost:5432, database naam 'OmDeHoek', gebruiker en wachtwoord 'postgres'. Pas aan indien nodig.
```json
"ConnectionStrings": {
    "devConnection": "Host=localhost:5432; Database=OmDeHoek; Username=postgres; Password=postgres"
  }
```

## Database migraties

### Nieuwste migraties toepassen

De database migraties zijn te vinden in de `Migrations` folder. Deze migraties worden gebruikt om de database structuur bij te werken naar de laatste versie. Om de migraties toe te passen, gebruik de volgende command in de terminal:
```bash
dotnet ef database update --project 'Mobile back-end/Mobile back-end.csproj'
```

### Nieuwe migratie aanmaken

Een nieuwe migratie aanmaken kan met de volgende command:
```bash
dotnet ef migrations add <NaamVanDeMigratie> --project 'Mobile back-end/Mobile back-end.csproj'
```

Dit moet enkel wanneer er wijzigingen zijn in de database structuur, zoals het toevoegen van een nieuwe tabel of het wijzigen van een kolom. Zolang er geen wijzingen zijn in de DataContext klasse, is het niet nodig om een nieuwe migratie aan te maken.

## De back-end runnen

De back-end kan gerund worden met de volgende command:
```bash
dotnet run --project 'Mobile back-end/Mobile back-end.csproj'
```

De back-end zal dan starten op `https://localhost:5001` en `http://localhost:5000`. De Swagger UI is te vinden op `https://localhost:5001/swagger` of `http://localhost:5000/swagger`.

De back-end runt standaard in Development mode.

## Deploy naar productie

De back-end kan gedeployed worden naar productie met de volgende command:
```bash
dotnet publish -c Release --project 'Mobile back-end/Mobile back-end.csproj'
```

Dit zal een release build maken van de back-end in de `bin/Release/net9.0/publish` folder. Deze folder kan dan geüpload worden naar een server of cloud provider naar keuze.

Hiervoor moet de `appsettings.json` file aangepast worden met de juiste database connection string voor productie. Dit kan bijvoorbeeld een connection string zijn voor een cloud database zoals AWS RDS, Azure Database for PostgreSQL of Google Cloud SQL.

## Extra informatie

- [Entity Framework Core documentatie](https://learn.microsoft.com/en-us/ef/core/)
- [ASP.NET Core documentatie](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-9.0)
- [PostgreSQL documentatie](https://www.postgresql.org/docs/)
- [Swagger documentatie](https://swagger.io/docs/)
- [Dotnet CLI documentatie](https://learn.microsoft.com/en-us/dotnet/core/tools/)
