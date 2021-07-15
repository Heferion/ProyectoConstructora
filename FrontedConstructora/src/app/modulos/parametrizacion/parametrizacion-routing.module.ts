import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuarioComponent } from '../usuario/listar-usuario/listar-usuario.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path : 'listar-paises',
    component: ListarPaisComponent
  },
  {
    path : 'listar-ciudades',
    component: ListarCiudadComponent
  },
  {
    path : 'listar-proyectos',
    component: ListarProyectoComponent
  },
  {
    path : 'listar-bloque',
    component: ListarBloqueComponent
  },
  {
    path : 'listar-inmuebles',
    component: ListarInmuebleComponent
  },
  {
    path : 'listar-usuarios',
    component: ListarUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
