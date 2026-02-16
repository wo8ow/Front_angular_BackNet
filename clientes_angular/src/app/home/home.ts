import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Importante para que funcione el botón "Ver Clientes"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] // Nota: styleUrls es un array
})
export class HomeComponent { 
  // La clase debe llamarse EXPLICITAMENTE 'HomeComponent' para coincidir con las rutas
}