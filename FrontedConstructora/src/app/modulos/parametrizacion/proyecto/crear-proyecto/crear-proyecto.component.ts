import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private servicioCiudad: CiudadService, 
    private servicioPais: PaisService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
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
        alert("No se encuentra el registro de paises")
      }
    )
  }

  GuardadRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let des= this.ObtenerFgValidador.descripcion.value;
    let img= this.ObtenerFgValidador.imagen.value;
    let cid= this.ObtenerFgValidador.ciudadId.value;
    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.imagen = img;
    modelo.ciudadId = parseInt(cid);
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro almacenando correctamente.")
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) =>{
        alert("Error almacenando el registro.")
        console.log(err)
      }
    );
  }

}
