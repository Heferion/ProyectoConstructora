import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      documento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      correoE: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();   
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorID(id);
    IniciarSelect();
  }

  ObtenerRegistroPorID(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        this.ObtenerFgValidador.documento.setValue(datos.documento);
        this.ObtenerFgValidador.nombres.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.ObtenerFgValidador.apellidos.setValue(datos.apellidos);
        this.ObtenerFgValidador.correoE.setValue(datos.correo_electronico);
        this.ObtenerFgValidador.telefono.setValue(datos.telefono);
        this.ObtenerFgValidador.rol.setValue(datos.rol);
      },
      (err) => {
        alert("No se encuentra el registro con id" + id)
        console.log(err)
      }
    )
  }

  IniciarSelect() {
    setTimeout(() => {
      IniciarSelect();
    }, 500);
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  ModificarRegistro() {
    let doc = this.ObtenerFgValidador.documento.value;
    let nom = this.ObtenerFgValidador.nombres.value;
    let apell = this.ObtenerFgValidador.apellidos.value;
    let rolUsuario = this.ObtenerFgValidador.rol.value;
    let tel = this.ObtenerFgValidador.telefono.value;
    let correo = this.ObtenerFgValidador.correoE.value;

    let modelo: UsuarioModelo = new UsuarioModelo();
    modelo.documento = doc;
    modelo.nombre = nom;
    modelo.apellidos = apell;
    modelo.rol = rolUsuario;
    modelo.telefono = tel;
    modelo.correo_electronico = correo;
    this.servicio.ModificarRegistroUsuario(modelo).subscribe(
      (datos) => {
        alert("registro almacenando correctamente.")
        this.router.navigate(["/venta/listar-usuarios"])
      },
      (err) => {
        alert("Error almacenando el registro.")
        console.log(err)
      }
    );
  }

}



