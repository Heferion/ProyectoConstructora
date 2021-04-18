import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearInfoFinancieraComponent } from './informacionFinanciera/crear-info-financiera/crear-info-financiera.component';
import { EditarInfoFinancieraComponent } from './informacionFinanciera/editar-info-financiera/editar-info-financiera.component';
import { EliminarInfoFinancieraComponent } from './informacionFinanciera/eliminar-info-financiera/eliminar-info-financiera.component';
import { ListarInfoFinancieraComponent } from './informacionFinanciera/listar-info-financiera/listar-info-financiera.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { CrearRegisPagoComponent } from './registroPago/crear-regis-pago/crear-regis-pago.component';
import { EditarRegisPagoComponent } from './registroPago/editar-regis-pago/editar-regis-pago.component';
import { EliminarRegisPagoComponent } from './registroPago/eliminar-regis-pago/eliminar-regis-pago.component';
import { ListarRegisPagoComponent } from './registroPago/listar-regis-pago/listar-regis-pago.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    ListarClienteComponent,
    CrearInfoFinancieraComponent,
    EditarInfoFinancieraComponent,
    EliminarInfoFinancieraComponent,
    ListarInfoFinancieraComponent,
    CrearSolicitudComponent,
    EditarSolicitudComponent,
    EliminarSolicitudComponent,
    ListarSolicitudComponent,
    CrearRegisPagoComponent,
    EditarRegisPagoComponent,
    EliminarRegisPagoComponent,
    ListarRegisPagoComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule
  ]
})
export class VentaModule { }
