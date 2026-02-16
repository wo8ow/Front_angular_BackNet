import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Asegura estos imports
  templateUrl: './nuevo-cliente.html'
})
export class NuevoCliente implements OnInit {
  titulo = false;
  idcliente = 0;

  frmCliente = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private _clienteServicio: ClienteService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.parametros.paramMap.subscribe((valores) => {
      const id = Number(valores.get('id'));
      if (id > 0) {
        this.titulo = true;
        this.idcliente = id;
        this._clienteServicio.uno(id).subscribe({
          next: (cliente) => this.frmCliente.patchValue(cliente),
          error: (err) => {
            alert('Error al cargar cliente: ' + err.message);
            this.rutas.navigate(['/cliente']);
          }
        });
      }
    });
  }

  guardar() {
    // Doble validación de seguridad
    if (this.frmCliente.invalid) {
      this.frmCliente.markAllAsTouched(); // Muestra los errores rojos si el usuario forzó el clic
      return;
    }

    const datosCliente = this.frmCliente.getRawValue();
    const clienteModel = {
      id: this.idcliente,
      nombres: datosCliente.nombres,
      direccion: datosCliente.direccion,
      telefono: datosCliente.telefono,
      email: datosCliente.email
    };

    const peticion = this.titulo 
      ? this._clienteServicio.editar(clienteModel) 
      : this._clienteServicio.nuevoCliente(clienteModel);

    peticion.subscribe({
      next: () => {
        alert('Operación exitosa');
        this.rutas.navigate(['/cliente']);
      },
      error: (err) => {
        // MANEJO DE ERRORES SEGÚN RÚBRICA
        console.error('Error Backend:', err);
        if (err.status === 400) {
          alert('Error de validación: Verifica los datos enviados.');
        } else if (err.status === 500) {
          alert('Error del servidor: Inténtalo más tarde.');
        } else {
          alert('Ocurrió un error inesperado.');
        }
      }
    });
  }
}