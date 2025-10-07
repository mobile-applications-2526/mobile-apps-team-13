using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Mobile_back_end.Middleware;
using Mobile_back_end.Model;
using Mobile_back_end.Model.Data;
using Mobile_back_end.Model.Entities;
using Mobile_back_end.Utils;

namespace Mobile_back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var env = builder.Environment;
            
            Env.SetEnvironment(
                dbConnection: builder.Configuration.GetConnectionString("devConnection"),
                environment: env.EnvironmentName,
                isDevelopment: env.IsDevelopment(),
                isProduction: env.IsProduction()
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

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));
                options.Filters.Add(new ConsumesAttribute("application/json"));
            }).AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
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

            if (env.IsDevelopment())
            {
                builder.Services.AddSwaggerGen(option =>
                {
                    option.SwaggerDoc("v1", new() {Title = "Mobile back-end", Version = "v1"});
                    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter a valid token",
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        BearerFormat = "JWT",
                        Scheme = "Bearer"
                    });
                    
                    option.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[]{}
                        }
                    });
                });
            }
            
            var app = builder.Build();

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            
            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseAuthorization();
            app.UseTokenManagerMiddleware();
            
            app.MapControllers();
            
            app.Run();
        }
    }
}