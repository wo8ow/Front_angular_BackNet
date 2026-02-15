import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlumnoInterface } from '../../interfaces/alumno.interface';

@Component({
  selector: 'app-nuevo-alumno.component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './nuevo-alumno.component.html',
  styleUrl: './nuevo-alumno.component.css',
})
export class NuevoAlumnoComponent {
  titulo = false;
  
  idAlumno:number = 0;


  frmAlumno: FormGroup = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
  });
  constructor(private _alumnoServicio:AlumnoService, private rutas:Router, 
    private parametros:ActivatedRoute){

      this.parametros.paramMap.subscribe(
        valores =>{
          const id = Number(valores.get("id"));
          if (id>0){
            this.titulo = true
            this._alumnoServicio.uno(id).subscribe(
              alumno =>{
                this.idAlumno = id
                this.frmAlumno.patchValue({
                    nombres: alumno.nombres,
                    direccion: alumno.direccion,
                    telefono: alumno.telefono,
                    email:alumno.email
                })
              }
            );
          }
        }
      )

  }

  guardar(){
    const alumno:AlumnoInterface = this.frmAlumno.getRawValue()
    if (this.idAlumno > 0){
      alumno.id = this.idAlumno
      this._alumnoServicio.editar(alumno).subscribe(response =>{
         if(response == null){
          alert("Se guardo con exito")
          this.rutas.navigate(["/alumnos"])
     }}
      )
    }else{
      this._alumnoServicio.nuevoAlumno(alumno).subscribe(
        respuesta =>{
          if(respuesta){
            alert("Se guardo con exito")
          this.rutas.navigate(["/alumnos"])
          }
        }
      )
    }

  }
}
