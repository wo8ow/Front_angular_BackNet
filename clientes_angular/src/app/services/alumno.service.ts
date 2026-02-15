import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoInterface } from '../interfaces/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  RUTA_API="https://localhost:7050/api/alumnos"
  
  constructor(private http:HttpClient) {}

  todos():Observable<AlumnoInterface[]>{
    return this.http.get<AlumnoInterface[]>(this.RUTA_API)
  } 

  uno(idAlumno:number):Observable<AlumnoInterface>{
    return this.http.get<AlumnoInterface>(this.RUTA_API + "/"+idAlumno)
  }
  nuevoAlumno(alumno:AlumnoInterface): Observable<AlumnoInterface>{
    return this.http.post<AlumnoInterface>(this.RUTA_API, alumno)
  }
  editar(alumno:AlumnoInterface): Observable<any>{
    return this.http.put<any>(this.RUTA_API + "/"+alumno.id, alumno)
  }

  eliminar(idcliente:number):Observable<any>{
    return this.http.delete(this.RUTA_API + "/"+idcliente)
  }
}