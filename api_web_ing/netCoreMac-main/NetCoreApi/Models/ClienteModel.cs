namespace NetCoreApi.Models;
public class ClienteModel
{
    public int id { get; set; }
    public string Nombres { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;


}