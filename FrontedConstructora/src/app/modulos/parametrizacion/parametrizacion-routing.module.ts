import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from '../usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from '../usuario/listar-usuario/listar-usuario.component';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path : 'listar-paises',
    component: ListarPaisComponent
  },
  {
    path : 'crear-pais',
    component: CrearPaisComponent
  },
  {
    path : 'editar-pais/:id',
    component: EditarPaisComponent
  },
  {
    path : 'eliminar-pais/:id',
    component: EliminarPaisComponent
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
    path : 'editar-ciudad/:id',
    component: EditarCiudadComponent
  },
  {
    path : 'eliminar-ciudad/:id',
    component: EliminarCiudadComponent
  },
  {
    path : 'listar-proyectos',
    component: ListarProyectoComponent
  },
  {
    path : 'crear-proyecto',
    component: CrearProyectoComponent
  },
  {
    path : 'editar-proyecto/:id',
    component: EditarProyectoComponent
  },
  {
    path : 'eliminar-proyecto/:id',
    component: EliminarProyectoComponent
  },
  {
    path : 'listar-bloque',
    component: ListarBloqueComponent
  },
  {
    path : 'crear-bloque',
    component: CrearBloqueComponent
  },
  {
    path : 'editar-bloque/:id',
    component: EditarBloqueComponent
  },
  {
    path : 'eliminar-bloque/:id',
    component: EliminarBloqueComponent
  },
  {
    path : 'listar-inmuebles',
    component: ListarInmuebleComponent
  },
  {
    path : 'crear-inmuebles',
    component: CrearInmuebleComponent
  },
  {
    path : 'editar-inmuebles/:id',
    component: EditarInmuebleComponent
  },
  {
    path : 'eliminar-inmuebles/:id',
    component: EliminarInmuebleComponent
  },
  {
    path : 'listar-usuarios',
    component: ListarUsuarioComponent
  },
  {
    path : 'crear-usuarios',
    component: CrearUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
