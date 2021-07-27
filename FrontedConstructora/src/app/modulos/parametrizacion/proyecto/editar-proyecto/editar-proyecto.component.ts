import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService,
    private servicioCiudad: CiudadService,
    private servicioPais: PaisService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      nombreImg: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paisId: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPais();
    this.ObtenerRegistroCiudad();
    this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        this.ObtenerFgValidador.imagen.setValue(datos.imagen);
        if(datos.ciudadId){
         this.DatosPais(datos.ciudadId);
       }
      },
      (err) => {
        alert("No se encuentra el registro con id" + id)
        console.log(err)
      }
    )
  }

  DatosPais(ciudadId: number){
    this.servicioCiudad.BuscarRegistrosPaisCiudad(ciudadId).subscribe(
      (datos) => {
        this.ObtenerFgValidador.paisId.setValue(datos.paisId);
        this.ObtenerFgValidador.ciudadId.setValue(ciudadId);
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  get ObtenerFgValidador() {
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
        alert("No se encuentra el registro de paises")
      }
    )
  }

  cargarCiudadesPorPais() {
    let pId = this.fgValidador.controls.paisId.value;
    this.servicioCiudad.BuscarRegistrosPais(pId).subscribe(
      (datos) => {
        this.listaCiudad = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  ModificarRegistro() {
    let nom = this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let des = this.ObtenerFgValidador.descripcion.value;
    let nomImg = this.ObtenerFgValidador.nombreImg.value;
    let cid = this.ObtenerFgValidador.ciudadId.value;

    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = des;
    modelo.imagen = nomImg;
    modelo.ciudadId = parseInt(cid);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("registro modificado correctamente.")
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) => {
        alert("Error modificando el registro.")
      }
    );
  }

  SeleccionArchivo(event:any){
    if(event.target.files.length >0){
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    }else{
      console.log("Se ha cancelado la seleccion de archivo")
    }
  }

  CargarImagenServidor(){
    let formData = new FormData();
    formData.append('file',this.fgValidador.controls.imagen.value);
    this.servicio.CargarArchivo(formData).subscribe(
      (datos)=>{
        this.fgValidador.controls.nombreImg.setValue(datos.filename);
      },
      (err) =>{
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}

