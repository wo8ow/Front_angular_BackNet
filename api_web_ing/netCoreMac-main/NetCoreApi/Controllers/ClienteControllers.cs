using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi.Data;
using NetCoreApi.Models;
using System.Linq.Expressions;

namespace NetCoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;
    

    public ClientesController(AppDbContext context)
    {
      _context = context;

    } 

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClienteModel>>> Get()
        => await _context.Set<ClienteModel>().AsNoTracking().ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ClienteModel>> Get(int id)
    {
        var item = await _context.Set<ClienteModel>().FindAsync(id);
        return item is null ? NotFound() : item;
    }

    [HttpPost]
    public async Task<ActionResult<ClienteModel>> PostClienteModel(ClienteModel clienteModel)
    {
        try
        {
            // 1. Validación de datos
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 2. FORZAR ID A CERO: Esto le dice a Entity Framework "Esto es nuevo, genera tú el ID"
            // Es vital si la base de datos tiene la columna como IDENTITY (Auto-increment)
            clienteModel.id = 0;

            _context.Clientes.Add(clienteModel);

            // 3. Intento de guardado
            await _context.SaveChangesAsync();

            return Ok (clienteModel);
        }
        catch (Exception ex)
        {
            // 4. CAPTURA DE ERROR: Si falla, devolvemos el detalle técnico
            // Esto te permitirá ver en la consola del navegador qué pasó exactamente (ej: nombre de columna inválido)
            return StatusCode(500, new
            {
                mensaje = "Error al guardar en base de datos",
                error = ex.Message,
                detalle = ex.InnerException?.Message
            });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, ClienteModel model)
    {
        if (id != model.id) return BadRequest("Id no coincide.");

        _context.Entry(model).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Set<ClienteModel>().FindAsync(id);
        if (item is null) return NotFound();

        _context.Set<ClienteModel>().Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
