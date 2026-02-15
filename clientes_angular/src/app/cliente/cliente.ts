import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ClienteService} from '../services/cliente.service'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  imports: [RouterLink, FormsModule, CommonModule],  //, 
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'

})
export class Cliente implements OnInit  {

  listaclientes = signal<any[]>([])
  constructor(private readonly clienteService:ClienteService) {}

  ngOnInit(): void {
   this.cargarlista();
  }

  cargarlista(){
     this.clienteService.todos().subscribe(lista =>
      {
        console.table(lista)
        this.listaclientes.set(Array.isArray(lista) ? lista : [])
      }
    )
  }
  uno(idcliente:number){

    this.clienteService.uno(idcliente).subscribe(
      cliente =>{
        //enviar al componente para edirtar
      }
    )

  }

eliminar(id:number){
  this.clienteService.eliminar(id).subscribe(
    response =>{
      if(response == null){
        alert("Se elimino con existo")
this.cargarlista();
      }
    }

  )

}
  

}
