import { Routes } from '@angular/router';
import { Cliente } from './cliente/cliente';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';
import { AlumnoComponent } from './alumno/alumno.component';
import { HomeComponent } from './home/home';

export const routes: Routes = [
    
    {   path: '', component: HomeComponent },
    {   path:"cliente", component:Cliente},
    {   path:"nuevoCliente", component:NuevoCliente },
    {   path:"editarCliente/:id", component:NuevoCliente},
    {   path:"alumnos", component:AlumnoComponent},
    {   path: '**', redirectTo: '' }
];
