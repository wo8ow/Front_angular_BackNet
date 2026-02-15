import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from "./menu/menu";
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, NuevoCliente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ejercicio1');
}
