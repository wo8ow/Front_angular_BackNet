using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace NetCoreApi.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            // 1. Instanciamos el constructor de opciones
            var builder = new DbContextOptionsBuilder<AppDbContext>();

            // 2. HARDCODE: Ponemos la cadena directamente para evitar errores de ruta en la consola
            // Nota: Esto solo se usa al ejecutar comandos 'Add-Migration' o 'Update-Database'
            var connectionString = "Server=localhost;Port=3306;Database=MiDb;User=root;Password=root;";

            // 3. Configuramos MySQL
            builder.UseMySQL(connectionString);

            // 4. Retornamos el contexto
            return new AppDbContext(builder.Options);
        }
    }
}