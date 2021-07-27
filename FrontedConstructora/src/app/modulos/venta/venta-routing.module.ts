import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';

const routes: Routes = [
  {
    path : 'crear-cliente',
    component: CrearClienteComponent
  },
  {
    path : 'editar-cliente/:id',
    component: EditarClienteComponent
  },
  {
    path : 'eliminar-cliente/:id',
    component: EliminarClienteComponent
  },
  {
    path : 'listar-clientes',
    component: ListarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
