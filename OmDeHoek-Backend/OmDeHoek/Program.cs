using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OmDeHoek.Middleware;
using OmDeHoek.Model;
using OmDeHoek.Model.Data;
using OmDeHoek.Model.Entities;
using OmDeHoek.Utils;

namespace OmDeHoek
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var env = builder.Environment;

            Env.SetEnvironment(
                dbConnection: builder.Configuration.GetConnectionString("devConnection") ?? "",
                environment: env.EnvironmentName,
                isDevelopment: env.IsDevelopment() || env.IsStaging() || env.EnvironmentName == "Staging",
                isProduction: env.IsProduction(),
                googleClientId: builder.Configuration["Authentication:Google:ClientId"] ?? ""
                );

            builder.Services.AddRouting(options => options.LowercaseUrls = true);

            if (Env.Environment == "Testing")
            {
                builder.Services.AddDbContext<DataContext>(opts =>
                {
                    opts.UseInMemoryDatabase("TestDb");
                });
            }
            else
            {
                builder.Services.AddDbContext<DataContext>(opts =>
                {
                    opts.UseNpgsql(Env.DbConnection);
                });
            }

            builder.Services.AddCustomServices();

            var corsName = "OmDeHoekCorsPolicy";
            builder.Services.AddCors(options =>
            {
                if (Env.IsDevelopment)
                {
                    options.AddPolicy(name: corsName,
                        policy =>
                        {
                            policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
                }
                else
                {
                    options.AddPolicy(
                        name: corsName,
                        policy =>
                        {
                            policy.WithOrigins("https://omdehoek.be")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
                }
            });

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));
                options.Filters.Add(new ConsumesAttribute("application/json"));
            }).AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            builder.Services.AddIdentity<User, IdentityRole>(
                    options =>
                    {
                        options.Password.RequireDigit = true;
                        options.Password.RequireLowercase = true;
                        options.Password.RequireNonAlphanumeric = true;
                        options.Password.RequireUppercase = true;
                        options.Password.RequiredLength = 8;
                        options.Password.RequiredUniqueChars = 1;
                        options.User.RequireUniqueEmail = true;
                    }
                )
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            var validIssuer = builder.Configuration.GetValue<string>("JwtTokenSettings:ValidIssuer");
            var validAudience = builder.Configuration.GetValue<string>("JwtTokenSettings:ValidAudience");
            var symmetricSecurityKey = builder.Configuration.GetValue<string>("JwtTokenSettings:SymmetricSecurityKey");

            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.IncludeErrorDetails = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = validIssuer,
                        ValidAudience = validAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(symmetricSecurityKey)
                        ),
                    };
                });

            builder.Services.AddProblemDetails();

            if (Env.IsDevelopment)
            {
                builder.Services.AddSwaggerGen(option =>
                {
                    option.SwaggerDoc("v1", new() { Title = "OmDeHoek", Version = "v1" });
                    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter a valid token",
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        BearerFormat = "JWT",
                        Scheme = "Bearer"
                    });

                    option.OperationFilter<AuthorizeCheckOperationFilter>();

                    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
                    option.IncludeXmlComments(xmlPath);
                });
            }

            var app = builder.Build();

            if (!Env.IsTesting)
            {
                using var scope = app.Services.CreateScope();
                using var context = scope.ServiceProvider.GetRequiredService<DataContext>();

                var pendingMigrations = context.Database.GetPendingMigrations();

                if (pendingMigrations.Any())
                {
                    context.Database.Migrate();
                    DataContextFactory.SeedDatabase(context, builder.Configuration);
                }
            }

            if (Env.IsDevelopment)
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(corsName);

            app.UseAuthorization();
            app.UseAuthorization();
            app.UseTokenManagerMiddleware();

            app.MapControllers();

            app.Run();
        }
    }
}