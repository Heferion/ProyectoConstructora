import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {


  fgValidador: FormGroup = new FormGroup({});
  listaProyecto: ProyectoModelo[] = [];
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];


  constructor(private fb: FormBuilder,
    private servicio: BloqueService,
    private servicioProyecto: ProyectoService,
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
      proyectoId: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPais();
    this.ObtenerRegistroCiudad();
    this.ObtenerRegistroProyecto();
    this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        if (datos.proyectoId) {
          this.DatosProyecto(datos.proyectoId);
        }
      },
      (err) => {
        alert("No se encuentra el registro con id" + id)
        console.log(err)
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

  DatosProyecto(proyectoId: number) {
    this.servicioProyecto.BuscarRegistrosCiudadProtecto(proyectoId).subscribe(
      (datos) => {
        if (datos.ciudadId) {
          this.servicioCiudad.BuscarRegistrosPaisCiudad(datos.ciudadId).subscribe(
            (datos) =>{
              this.ObtenerFgValidador.paisId.setValue(datos.paisId);
              this.ObtenerFgValidador.ciudadId.setValue(datos.id);
              this.ObtenerFgValidador.proyectoId.setValue(proyectoId);
            },
            (err) => {
              alert("No se encuentra el registro de paises")
            }
          )
        }

      },
      (err) => {
        alert("No se encuentra el registro de ciudades")
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
    let proId = this.ObtenerFgValidador.proyectoId.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = des;
    modelo.proyectoId = parseInt(proId);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente")
        this.router.navigate(["/parametrizacion/listar-bloque"])
      },
      (err) => {
        alert("Error modificando el registro")
      }
    )

  }

}
