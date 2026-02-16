import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./menu/menu";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title='clientes_angular';
}
