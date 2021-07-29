import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { InmuebleService } from 'src/app/servicios/inmueble.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaProyecto: ProyectoModelo[] = [];
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];
  listaBloque: BloqueModelo[]= [];

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService, 
    private servicioBloque: BloqueService, 
    private servicioProyecto: ProyectoService,
    private servicioCiudad: CiudadService, 
    private servicioPais: PaisService,
    private router: Router) {

  }


  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      identificador: ['', [Validators.required]],
      valor:  ['', [Validators.required]],
      estado: ['', [Validators.required]],
      bloqueId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ObtenerRegistroPais();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ObtenerRegistroPais() {
    this.servicioPais.ListarRegistros().subscribe(
      (datos) => {
        this.listaPais = datos;
        setTimeout(() =>{
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  CargarCiudadesPorPais(){
    let pId = this.fgValidador.controls.paisId.value;
    this.servicioCiudad.BuscarRegistrosPais(pId).subscribe(
      (datos) => {
        this.listaCiudad = datos;
        setTimeout(() =>{
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de ciudades")
      }
    )
  }

  CargarProyectosPorCiudad(){
    let cId = this.fgValidador.controls.ciudadId.value;
    this.servicioProyecto.BuscarRegistrosCiudad(cId).subscribe(
      (datos) => {
        this.listaProyecto = datos;
        setTimeout(() =>{
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de proyectos")
      }
    )
  }

  CargarBloquesPorProyectos(){
    let bId = this.fgValidador.controls.proyectoId.value;
    this.servicioBloque.BuscarRegistrosProyecto(bId).subscribe(
      (datos) => {
        this.listaBloque = datos;
        setTimeout(() =>{
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de bloques")
      }
    )
  }

  GuardarRegistro(){
    let iden = this.ObtenerFgValidador.identificador.value;
    let val = this.ObtenerFgValidador.valor.value;
    let blo = this.ObtenerFgValidador.bloqueId.value;
    let est = this.ObtenerFgValidador.estado.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.valor = val;
    modelo.bloqueId = parseInt(blo);
    modelo.estado = est;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) =>{
        alert("Error almacenando el registro")
      }
    )


  }

}
