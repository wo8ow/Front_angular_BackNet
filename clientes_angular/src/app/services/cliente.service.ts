import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  RUTA_API="https://localhost:7050/api/clientes"
  constructor(private http:HttpClient) {}

  //todos 
  todos():Observable<any[]>{
    return this.http.get<any[]>(this.RUTA_API)
  }  

  uno(idcliente:number):Observable<any>{
    console.log(this.RUTA_API + "/"+idcliente)
    return this.http.get(this.RUTA_API + "/"+idcliente)
  }

  nuevoCliente(cliente:any): Observable<any>{
    return this.http.post<any>(this.RUTA_API, cliente)
  }
  editar(cliente:any): Observable<any>{
    return this.http.put<any>(this.RUTA_API + "/"+cliente.id, cliente)
  }

  eliminar(idcliente:number):Observable<any>{
   
    return this.http.delete(this.RUTA_API + "/"+idcliente)
  }
}
/*
TEXT, INT, STRING, BOOL, CLIENTE

ANY => LO QUE SEA

*/

