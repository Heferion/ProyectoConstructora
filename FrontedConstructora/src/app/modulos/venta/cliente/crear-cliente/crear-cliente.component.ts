import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaisService } from 'src/app/servicios/pais.service';

declare var IniciarSelect: any;
declare var IniciarFecha: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];
  listaCiudad: CiudadModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: ClienteService,
    private servicioCiudad: CiudadService,
    private servicioPais: PaisService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      documento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      nombreImg: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],
      paisId: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      correoE: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ObtenerRegistroPais();
    this.IniciarFechaNacimiento();
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  IniciarFechaNacimiento() {
    setTimeout(() => {
      IniciarFecha();
    }, 500);
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

  CargarCiudadesPorPais() {
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

  GuardadRegistro() {
    let doc = this.ObtenerFgValidador.documento.value;
    let nom = this.ObtenerFgValidador.nombres.value;
    let apell = this.ObtenerFgValidador.apellidos.value;
    let cid = this.ObtenerFgValidador.ciudadId.value;
    let fechaNa = this.ObtenerFgValidador.fechaNacimiento.value;
    let nomImg = this.ObtenerFgValidador.nombreImg.value;
    let tel = this.ObtenerFgValidador.telefono.value;
    let correo = this.ObtenerFgValidador.correoE.value;
    let dir = this.ObtenerFgValidador.direccion.value;

    let modelo: ClienteModelo = new ClienteModelo();
    modelo.documento = doc;
    modelo.nombres = nom;
    modelo.apellidos = apell;
    modelo.fotografia = nomImg;
    modelo.ciudadId = parseInt(cid);
    modelo.fecha_nacimiento = fechaNa;
    modelo.numero_celular = tel;
    modelo.correo_electronico = correo;
    modelo.direccion = dir;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("registro almacenando correctamente.")
        this.router.navigate(["/venta/listar-clientes"])
      },
      (err) => {
        alert("Error almacenando el registro.")
        console.log(err)
      }
    );
  }

  SeleccionArchivo(event: any) {
    if (event.target.files.length > 0) {
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    } else {
      console.log("Se ha cancelado la seleccion de archivo")
    }
  }

  CargarImagenServidor() {
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.servicio.CargarArchivo(formData).subscribe(
      (datos) => {
        this.fgValidador.controls.nombreImg.setValue(datos.filename);
      },
      (err) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}

