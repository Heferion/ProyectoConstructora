import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component:InicioComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path:'seguridad',
    loadChildren: ()=> import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path:'usuario',
    loadChildren: ()=> import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path:'venta',
    loadChildren: ()=> import('./modulos/venta/venta.module').then(m => m.VentaModule)
  },
  {
    path:'reporte',
    loadChildren: ()=> import('./modulos/reporte/reporte.module').then(m => m.ReporteModule)
  },
  {
    path:'parametrizacion',
    loadChildren: ()=> import('./modulos/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule)
  },
  {
    path:'**',
    component:Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
