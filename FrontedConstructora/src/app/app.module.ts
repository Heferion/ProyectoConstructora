import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionSuperiorComponent } from './publico/paginaMaestra/barra-navegacion-superior/barra-navegacion-superior.component';
import { MenuLateralComponent } from './publico/paginaMaestra/menu-lateral/menu-lateral.component';
import { PieDePaginaComponent } from './publico/paginaMaestra/pie-de-pagina/pie-de-pagina.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { Error404Component } from './publico/errores/error404/error404.component';
import { NosotrosComponent } from './publico/infGeneral/nosotros/nosotros.component';
import { ServiciosComponent } from './publico/infGeneral/servicios/servicios.component';
import { ContactoComponent } from './publico/infGeneral/contacto/contacto.component';
import { HttpClientModule } from '@angular/common/http';
import { ProyectosGeneralComponent } from './publico/infGeneral/proyectos/proyectos-general/proyectos-general.component';
import { ProyectoUnoComponent } from './publico/infGeneral/proyectos/proyecto-uno/proyecto-uno.component';
import { ProyectoDosComponent } from './publico/infGeneral/proyectos/proyecto-dos/proyecto-dos.component';
import { ProyectoTresComponent } from './publico/infGeneral/proyectos/proyecto-tres/proyecto-tres.component';
import { ProyectoCuatroComponent } from './publico/infGeneral/proyectos/proyecto-cuatro/proyecto-cuatro.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionSuperiorComponent,
    MenuLateralComponent,
    PieDePaginaComponent,
    InicioComponent,
    Error404Component,
    NosotrosComponent,
    ServiciosComponent,
    ContactoComponent,
    ProyectosGeneralComponent,
    ProyectoUnoComponent,
    ProyectoDosComponent,
    ProyectoTresComponent,
    ProyectoCuatroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
