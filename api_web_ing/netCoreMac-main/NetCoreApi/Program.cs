using Microsoft.EntityFrameworkCore;
using NetCoreApi.Data;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "AllowAll";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var cs = builder.Configuration.GetConnectionString("Default")
         ?? "Server=localhost;Database=usuarios_s5;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(cs));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddEndpointsApiExplorer(); // Necesario para versiones nuevas
builder.Services.AddSwaggerGen(); // Recomendado si usas OpenAPI

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(CorsPolicyName);

app.MapControllers();

app.Run();
