import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute) {

  }


  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      identificador: ['', [Validators.required]],
      valor:  ['', [Validators.required]],
      estado: ['', [Validators.required]],
      bloqueId: ['', [Validators.required]],
      id: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPais();
    this.ObtenerRegistroCiudad();
    this.ObtenerRegistroProyecto();
    this.ObtenerRegistroBloque();
    this.obtenerRegistroPorId(id);
  }

  obtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.obtenerFgValidador.identificador.setValue(datos.identificador);
        this.obtenerFgValidador.valor.setValue(datos.valor);
        this.obtenerFgValidador.id.setValue(datos.id);
        this.obtenerFgValidador.estado.setValue(datos.estado);
        this.obtenerFgValidador.bloqueId.setValue(datos.bloqueId);

        
      },
      (err) =>{
        alert("No se encuentra el registro con la id: " +id)
      }
    )

  }

  get obtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ObtenerRegistroPais() {
    this.servicioPais.ListarRegistros().subscribe(
      (datos) => {
        this.listaPais = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  ObtenerRegistroCiudad() {
    this.servicioCiudad.ListarRegistros().subscribe(
      (datos) => {
        this.listaCiudad = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de ciudades")
      }
    )
  }

  ObtenerRegistroProyecto() {
    this.servicioProyecto.ListarRegistros().subscribe(
      (datos) => {
        this.listaProyecto = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de proyectos")
      }
    )
  }

  ObtenerRegistroBloque() {
    this.servicioBloque.ListarRegistros().subscribe(
      (datos) => {
        this.listaBloque = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de bloques")
      }
    )
  }

  ModificarRegistro(){
    let iden = this.obtenerFgValidador.identificador.value;
    let id = this.obtenerFgValidador.id.value;
    let val = this.obtenerFgValidador.valor.value;
    let blo = this.obtenerFgValidador.bloqueId.value;
    let est = this.obtenerFgValidador.estado.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.valor = val;
    modelo.bloqueId = blo;
    modelo.id = id;
    modelo.estado = est;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) =>{
        alert("Error modificando el registro")
      }
    )


  }

}
