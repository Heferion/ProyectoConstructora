import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  
  fgValidador: FormGroup = new FormGroup({});
  listaProyecto: ProyectoModelo[] = [];
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: BloqueService, 
    private servicioProyecto: ProyectoService,
    private servicioCiudad: CiudadService, 
    private servicioPais: PaisService,
    private router: Router) {

  }


  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyectoId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ObtenerRegistroPais();
  }

   get obtenerFgValidador(){
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

  cargarCiudadesPorPais(){
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

   cargarProyectosPorCiudad(){
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

  GuardarRegistro(){
    let nom = this.obtenerFgValidador.nombre.value;
    let des = this.obtenerFgValidador.descripcion.value;
    let pro = this.obtenerFgValidador.proyectoId.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.proyectoId = parseInt(pro);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro almacenado correctamente")
        this.router.navigate(["/parametrizacion/listar-bloque"])
      },
      (err) =>{
        alert("Error almacenando el registro")
      }
    )
    
  }

}
