import { Routes } from '@angular/router';

import { Cliente } from './cliente/cliente';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';
import { AlumnoComponent } from './alumno/alumno.component';
import { NuevoAlumnoComponent } from './alumno/nuevo-alumno.component/nuevo-alumno.component';


export const routes: Routes = [
    {
        path:"",
        component:Cliente,
        pathMatch:"full"
    },
    {
        path:"cliente",
        component:Cliente
    },
    {
        path:"nuevoCliente",
        component:NuevoCliente
    },
    {
        path:"editarCliente/:id",
        component:NuevoCliente
    },
    {
        path:"alumnos",
        component:AlumnoComponent
    },
    {
        path:"nuevoalumno",
        component:NuevoAlumnoComponent
    },
    {
        path:"editaralumno/:id",
        component:NuevoAlumnoComponent
    }

];
