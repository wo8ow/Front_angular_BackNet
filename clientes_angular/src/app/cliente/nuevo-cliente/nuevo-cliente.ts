import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './nuevo-cliente.html',
  styleUrl: './nuevo-cliente.css',
})
export class NuevoCliente {

  titulo = false;
  idcliente = 0;

  frmCliente: FormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
  });
  constructor(private _clienteServicio:ClienteService, private rutas:Router, 
    private parametros:ActivatedRoute){

      this.parametros.paramMap.subscribe(
        valores =>{
          const id = Number(valores.get("id"));
          if (id>0){
            this.titulo = true
            this._clienteServicio.uno(id).subscribe(
              cliente =>{
                this.idcliente = cliente.id
                this.frmCliente.patchValue({
                    id: cliente.id,
                    nombres: cliente.nombres,
                    direccion: cliente.direccion,
                    telefono: cliente.telefono,
                    email:cliente.email
                })
              }
            );
          }
        }
      )

  }


guardar() {
    const datosCliente = this.frmCliente.getRawValue();
    const clienteModel = {
      id: datosCliente ?? 0,
      nombres: datosCliente.nombres.trim(),
      direccion: datosCliente.direccion.trim(),
      telefono: datosCliente.telefono.trim(),
      email: datosCliente.email.trim(),
    };

    console.log(datosCliente)
    if(this.titulo == true){

      

      this._clienteServicio.editar(clienteModel).subscribe((response) => {
        console.log(response)
     if(response == null){
          alert("Se guardo con exito")
          this.rutas.navigate(["/cliente"])
     }
    });
    }else{
      this._clienteServicio.nuevoCliente(clienteModel).subscribe((response) => {
          if(response.id > 0){
                alert("Se guardo con exito")
                this.rutas.navigate(["/cliente"])
          }
          });
    }


    
  }



}
