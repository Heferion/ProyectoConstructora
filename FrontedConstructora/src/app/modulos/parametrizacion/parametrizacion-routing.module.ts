import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path : 'listar-paises',
    component: ListarPaisComponent
  },
  {
    path : 'crear-paises',
    component: CrearPaisComponent
  },
  {
    path : 'listar-ciudades',
    component: ListarCiudadComponent
  },
  {
    path : 'crear-ciudades',
    component: CrearCiudadComponent
  },
  {
    path : 'listar-proyectos',
    component: ListarProyectoComponent
  },
  {
    path : 'crear-proyectos',
    component: CrearProyectoComponent
  },
  {
    path : 'listar-bloque',
    component: ListarBloqueComponent
  },
  {
    path : 'crear-bloques',
    component: CrearBloqueComponent
  },
  {
    path : 'listar-inmuebles',
    component: ListarInmuebleComponent
  },
  {
    path : 'crear-inmuebles',
    component: CrearInmuebleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
